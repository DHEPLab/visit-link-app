import moment from "moment";
import Http from "../utils/http";
import * as Location from "expo-location";
import { ToastAndroid } from "react-native";
import i18next from "i18next";

function defaultDatetime(range, visitTime) {
  if (!visitTime) visitTime = moment();

  if (
    // unlimit range
    !range ||
    !range[0] ||
    // unlimit range end
    (!range[1] && moment(range[0]).isBefore(formatDate(visitTime))) ||
    // limit range
    (moment(range[0]).isBefore(formatDate(visitTime)) &&
      moment(range[1]).isAfter(formatDate(visitTime)))
  ) {
    return visitTime;
  }

  if (moment(formatDate(visitTime)).isSame(range[0])) {
    return visitTime;
  }

  // return range start with default time 08:00 AM
  return range[0];
}

function defaultStartingRange() {
  const now = moment();
  return formatDate(now);
}

function meridiem(momentInstance) {
  let hour = momentInstance.hour();
  const minute = momentInstance.minute();
  hour += minute / 60;
  if (hour <= 9) {
    return "早上";
  } else if (hour <= 11.5) {
    return "上午";
  } else if (hour <= 13.5) {
    return "中午";
  } else if (hour < 18) {
    return "下午";
  } else {
    return "晚上";
  }
}

function formatDate(date) {
  return moment(date).format("YYYY-MM-DD");
}

function formatDateCN(date) {
  return moment(date).format("YYYY年MM月DD日");
}

function formatDateEN(date) {
  return moment(date).format("YYYY/MM/DD");
}

function formatTimeCN(time) {
  return meridiem(moment(time)) + moment(time).format("h:mm");
}
function formatTimeEN(time) {
  return moment(time).format("h:mm a");
}
function formatDateTime(datetime) {
  return moment(datetime).format("YYYY-MM-DDTHH:mm:ss");
}

function formatDateTimeUTC(datetime) {
  return moment(datetime).utc().format("YYYY-MM-DDTHH:mm:ssZ");
}

function formatDateTimeCN(datetime) {
  if (!datetime) return "";
  return moment(datetime).format("YYYY年MM月DD日/") + formatTimeCN(datetime);
}

function formatDateTimeEN(datetime) {
  if (!datetime) return "";
  return moment(datetime).format("YYYY/MM/DD h:mm a");
}

function mergeDateAndTime(date, time) {
  return `${formatDate(date)}T${moment(time).format("HH:mm:ssZ")}`;
}

function statusNotStart(status) {
  return status === "NOT_STARTED";
}

function statusUndone(status) {
  return status === "UNDONE";
}

function statusExpired(status) {
  return status === "EXPIRED";
}

export default {
  canIStart(status, visitTime) {
    if (status !== "NOT_STARTED") return false;
    const now = moment();
    return moment(formatDate(now)).isSame(formatDate(moment(visitTime)));
  },
  disabledVisitButton(now, selected) {
    return moment(formatDate(now)).isAfter(selected);
  },
  defaultVisitTime(now, selected) {
    if (!selected || moment(formatDate(now)).isSame(selected)) {
      return formatDateTime(now);
    }
    return `${selected}T08:00`;
  },
  formatDate,
  formatDateTime,
  formatTimeCN,
  formatTimeEN,
  formatDateTimeEN,
  formatDateTimeCN,
  formatDateCN,
  formatDateEN,
  mergeDateAndTime,
  defaultDatetime,
  formatDateTimeUTC,
  statusDone: (status) => status === "DONE",
  statusUndone,
  statusNotStart,
  statusExpired,
  defaultStartingRange,
  remarkTitle: (status) =>
    statusNotStart(status)
      ? i18next.t("Visits:remarkTitle")
      : statusUndone(status)
        ? i18next.t("Visits:undoneReason")
        : i18next.t("Visits:expiredReason"),
  visitTimeMayConflict(vt1, vt2) {
    const diff = moment(vt1).diff(moment(vt2), "minutes");
    return Math.abs(diff) <= 60;
  },
};

export function uploadVisitLocation(babyId, visitId) {
  (async () => {
    const hasEnableLocation = await Location.hasServicesEnabledAsync();
    if (!hasEnableLocation) {
      ToastAndroid.show(
        i18next.t("App:locationServiceMessage"),
        ToastAndroid.LONG,
      );
      return;
    }
    try {
      console.log("start getLocation");
      Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        timeInterval: 5000,
      }).then((location) => {
        const { latitude, longitude } = location.coords;
        Http.post("/api/visits/upload/location", {
          babyId,
          visitId,
          longitude,
          latitude,
        });
        console.log("getLocation", longitude, latitude);
      });
    } catch (e) {
      console.log("Error while trying to get location: ", e);
    }
  })();
}
