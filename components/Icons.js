import React from 'react';
import { Text } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { px2dp } from '../utils/styled';

const svgs = {
  home: `
  <?xml version="1.0" encoding="UTF-8"?>
  <svg width="50px" height="44px" viewBox="0 0 50 44" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <!-- Generator: Sketch 59.1 (86144) - https://sketch.com -->
      <title>4A976233-D929-4D19-8665-9740E2738D6A</title>
      <desc>Created with Sketch.</desc>
      <defs>
          <linearGradient x1="100%" y1="50%" x2="0%" y2="50%" id="linearGradient-1">
              <stop stop-color="#F2709C" offset="0%"></stop>
              <stop stop-color="#FF9472" offset="100%"></stop>
          </linearGradient>
      </defs>
      <g id="组件" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="icon/首页/未选中">
              <g id="编组" transform="translate(0.000125, 0.000000)">
                  <path d="M46.9386505,10.2040816 C46.9386505,14.1492347 43.7406276,17.3469388 39.7957934,17.3469388 C35.8509592,17.3469388 32.6529362,14.1492347 32.6529362,10.2040816 C32.6529362,6.25924745 35.8509592,3.06122449 39.7957934,3.06122449 C43.7406276,3.06122449 46.9386505,6.25924745 46.9386505,10.2040816" id="Fill-1" fill="#FFAFBD"></path>
                  <path d="M31,44 C29.895625,44 28.9996875,43.0906636 28.9996875,41.9689901 C28.9996875,40.8469992 29.895625,39.9373454 31,39.9373454 L37,39.9373454 C38.1021875,39.9373454 38.9996875,39.0257873 38.9996875,37.9063356 L38.9996875,25.2105401 C38.9996875,22.1295879 41.4678125,19.6237553 44.5,19.6237553 L45,19.6237553 C45.5515625,19.6237553 46,19.1679762 46,18.6080916 L46,17.8511048 C46,17.1452186 45.6296875,16.4790067 45.035,16.1130504 L25.91125,4.35991778 C25.2684375,3.96634812 24.4721875,3.96856988 23.83125,4.36531349 L4.955625,16.1051156 C4.365625,16.4717067 3.9996875,17.135062 3.9996875,17.8374569 L3.9996875,18.6080916 C3.9996875,19.1679762 4.4484375,19.6237553 5,19.6237553 L5.5,19.6237553 C8.5325,19.6237553 11,22.1295879 11,25.2105401 L11,37.9063356 C11,39.0257873 11.896875,39.9373454 13,39.9373454 L15,39.9373454 C16.1028125,39.9373454 17,39.0257873 17,37.9063356 L17,29.7807091 C17,26.4204494 19.69125,23.6867272 23,23.6867272 L31,23.6867272 C32.104375,23.6867272 32.9996875,24.596381 32.9996875,25.7180545 C32.9996875,26.8400454 32.104375,27.7496992 31,27.7496992 L23,27.7496992 C21.896875,27.7496992 21,28.6609399 21,29.7807091 L21,37.9063356 C21,41.2665952 18.3084375,44 15,44 L13,44 C9.69125,44 7,41.2665952 7,37.9063356 L7,25.2105401 C7,24.3700784 6.3271875,23.6867272 5.5,23.6867272 L5,23.6867272 C2.243125,23.6867272 0,21.4081493 0,18.6080916 L0,17.8374569 C0,15.7305896 1.0984375,13.7389367 2.866875,12.6401156 L21.7425,0.900948302 C23.6640625,-0.293726052 26.055625,-0.301343529 27.9825,0.884443768 L47.10625,12.6375764 C48.8915625,13.735128 50,15.7331288 50,17.8511048 L50,18.6080916 C50,21.4081493 47.756875,23.6867272 45,23.6867272 L44.5,23.6867272 C43.6728125,23.6867272 42.9996875,24.3700784 42.9996875,25.2105401 L42.9996875,37.9063356 C42.9996875,41.2665952 40.3084375,44 37,44 L31,44 Z" id="Fill-3" fill="url(#linearGradient-1)"></path>
              </g>
          </g>
      </g>
  </svg>
  `,
  baby: `
  <?xml version="1.0" encoding="UTF-8"?>
<svg width="50px" height="44px" viewBox="0 0 50 44" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 59.1 (86144) - https://sketch.com -->
    <title>8AA69F5F-122C-4F70-91DF-5C82387CCE40</title>
    <desc>Created with Sketch.</desc>
    <defs>
        <linearGradient x1="100%" y1="50%" x2="0%" y2="50%" id="linearGradient-1">
            <stop stop-color="#F2709C" offset="0%"></stop>
            <stop stop-color="#FF9472" offset="100%"></stop>
        </linearGradient>
    </defs>
    <g id="组件" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="icon/宝宝列表/未选中">
            <g id="编组">
                <path d="M41.5258657,10.8135593 C41.5258657,14.7262999 38.3983873,17.8983051 34.5405715,17.8983051 C30.6827558,17.8983051 27.5552774,14.7262999 27.5552774,10.8135593 C27.5552774,6.9008187 30.6827558,3.72881356 34.5405715,3.72881356 C38.3983873,3.72881356 41.5258657,6.9008187 41.5258657,10.8135593" id="Fill-1" fill="#FFAFBD"></path>
                <path d="M26.84,0 C26.85375,0 26.9590625,0.00124999112 26.9725,0.00187498668 C27.0165625,0.00281248002 27.0578125,0.0137499023 27.10125,0.0174998757 C27.1590625,0.0121874134 27.215,0 27.274375,0 C31.836875,0 35.54875,3.71184864 35.54875,8.27431623 C35.54875,12.8370963 31.836875,16.548945 27.274375,16.548945 C22.711875,16.548945 19,12.8370963 19,8.27431623 C19,7.16994908 19.895625,6.27433044 21,6.27433044 C22.104375,6.27433044 23,7.16994908 23,8.27431623 C23,10.6317995 24.9175,12.5489734 27.274375,12.5489734 C29.630625,12.5489734 31.54875,10.6317995 31.54875,8.27431623 C31.54875,5.91745797 29.630625,3.99997159 27.274375,3.99997159 C27.231875,3.99997159 27.191875,3.98997166 27.15,3.98715918 C27.0996875,3.99122165 27.05125,4.00215908 27,4.00215908 L27,4.00215908 L26.9815625,4.00215908 L26.9790625,3.9699718 C26.9328125,3.96309685 26.8853125,3.95965938 26.84,3.94934695 L26.84,3.94934695 L26.84,3.99997159 C18.4125,3.99997159 11.0521875,9.9543043 8.94125,18.4801812 C8.9240625,18.5511182 8.896875,18.6161178 8.8725,18.6829923 C8.859375,18.7192421 8.8503125,18.7570543 8.835,18.792054 C8.7865625,18.9051782 8.7284375,19.0120525 8.6615625,19.1117393 C8.65125,19.1276767 8.6378125,19.1408016 8.626875,19.1561139 C8.5678125,19.2392384 8.5040625,19.3179878 8.43375,19.3904873 C8.40625,19.4186121 8.3759375,19.4429869 8.346875,19.4692367 C8.2878125,19.5236113 8.2271875,19.5751735 8.1621875,19.6217356 C8.1246875,19.6486105 8.0859375,19.6726728 8.04625,19.6970476 C7.9828125,19.7361098 7.918125,19.7714221 7.8509375,19.8032969 C7.8078125,19.8236092 7.7653125,19.8432966 7.720625,19.8604839 C7.645,19.8898587 7.5671875,19.9126711 7.488125,19.9326709 C7.4496875,19.9423584 7.4125,19.9545458 7.373125,19.9620457 C7.2515625,19.9851706 7.1278125,20.0001705 7.0015625,20.0001705 C7.000625,20.0001705 6.9996875,19.999858 6.99875,19.999858 C5.3734375,20.0007954 4,21.8323449 4,24.000142 C4,26.1679391 5.3740625,28.0001136 7,28.0001136 C8.01375,28.0001136 8.8425,28.7572958 8.973125,29.7354138 C10.9371875,35.9122449 17.3421875,40.0215908 24.9703125,40.0000284 C32.779375,39.9678411 39.2528125,35.7247463 41.0790625,29.4416659 C41.09,29.4044787 41.1090625,29.3719789 41.121875,29.3360416 C41.1446875,29.2707296 41.1690625,29.2072926 41.19875,29.145418 C41.2271875,29.0851059 41.25875,29.0282313 41.2928125,28.9719817 C41.3246875,28.9185446 41.3584375,28.8669825 41.395,28.8172953 C41.4359375,28.7616707 41.4790625,28.7097961 41.525,28.659484 C41.5659375,28.6151093 41.6078125,28.5722971 41.6521875,28.5313599 C41.70125,28.4860477 41.751875,28.444798 41.8053125,28.4051108 C41.855625,28.366986 41.9075,28.3313613 41.9615625,28.298549 C42.015625,28.2654243 42.0709375,28.2360495 42.1278125,28.2082372 C42.186875,28.1794874 42.2465625,28.1532375 42.3090625,28.1304252 C42.3690625,28.1082379 42.4296875,28.0898005 42.4921875,28.0732381 C42.5540625,28.0569882 42.615625,28.0429258 42.6796875,28.0323009 C42.7490625,28.021051 42.8190625,28.015426 42.8896875,28.0113636 C42.926875,28.0091761 42.9621875,28.0001136 43,28.0001136 C44.6259375,28.0001136 46,26.1679391 46,24.000142 C46,21.8317199 44.6259375,19.999858 43,19.999858 C42.90875,19.999858 42.8209375,19.9845456 42.7328125,19.9726706 C42.6246875,19.990483 42.5165625,20.0001705 42.4090625,20.0001705 C41.5859375,20.0001705 40.814375,19.4879866 40.524375,18.6676799 C39.8525,16.7733184 38.6778125,15.0167683 37.0303125,13.4480295 C36.2303125,12.6861599 36.199375,11.4202314 36.9609375,10.6205496 C37.7215625,9.82055525 38.989375,9.79024297 39.788125,10.5514876 C41.528125,12.2086633 42.8578125,14.0549002 43.7678125,16.050511 C47.266875,16.4892579 50,19.8854838 50,24.000142 C50,27.8254274 47.636875,31.0282171 44.4925,31.8125866 C41.7271875,39.1159722 34.071875,43.9621878 24.986875,44 L24.986875,44 L24.8828125,44 C15.874375,44 8.238125,39.1481595 5.464375,31.8000866 C2.3415625,30.9972798 0,27.8079275 0,24.000142 C0,20.2017315 2.33,17.0198791 5.4409375,16.2067599 C8.4053125,6.60245311 17.0134375,0 26.84,0 Z M29.9712438,26.8474576 C31.0732987,26.8474576 31.9670421,27.7658528 31.9670421,28.8983051 C31.9670421,32.2911758 28.8330151,35.0508475 24.981748,35.0508475 C21.1298573,35.0508475 17.9964539,32.2911758 17.9964539,28.8983051 C17.9964539,27.7658528 18.8901973,26.8474576 19.9922522,26.8474576 C21.0943071,26.8474576 21.9880505,27.7658528 21.9880505,28.8983051 C21.9880505,29.9907018 23.3869804,30.9491525 24.981748,30.9491525 C26.5758919,30.9491525 27.9754455,29.9907018 27.9754455,28.8983051 C27.9754455,27.7658528 28.8691889,26.8474576 29.9712438,26.8474576 Z M17.6288068,19.3898305 C19.0500385,19.3898305 20.2023363,20.5585339 20.2023363,22 C20.2023363,23.4414661 19.0500385,24.6101695 17.6288068,24.6101695 C16.2075752,24.6101695 15.0552774,23.4414661 15.0552774,22 C15.0552774,20.5585339 16.2075752,19.3898305 17.6288068,19.3898305 Z M33.0699833,19.3898305 C34.4912149,19.3898305 35.6435127,20.5585339 35.6435127,22 C35.6435127,23.4414661 34.4912149,24.6101695 33.0699833,24.6101695 C31.6487517,24.6101695 30.4964539,23.4414661 30.4964539,22 C30.4964539,20.5585339 31.6487517,19.3898305 33.0699833,19.3898305 Z" id="形状结合" fill="url(#linearGradient-1)"></path>
            </g>
        </g>
    </g>
</svg>
  `,
  visit: `
  <?xml version="1.0" encoding="UTF-8"?>
  <svg width="50px" height="44px" viewBox="0 0 50 44" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <!-- Generator: Sketch 59.1 (86144) - https://sketch.com -->
      <title>3C7750BF-4325-4BA1-89CF-98513EAE8DB4</title>
      <desc>Created with Sketch.</desc>
      <defs>
          <linearGradient x1="100%" y1="50%" x2="0%" y2="50%" id="linearGradient-1">
              <stop stop-color="#F2709C" offset="0%"></stop>
              <stop stop-color="#FF9472" offset="100%"></stop>
          </linearGradient>
      </defs>
      <g id="组件" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="icon/家访记录/未选中">
              <g id="编组" transform="translate(-0.000063, 0.000000)">
                  <path d="M42.9999375,11.2171493 C42.9999375,15.0504169 39.8661875,18.1579944 36.00025,18.1579944 C32.134,18.1579944 28.9999375,15.0504169 28.9999375,11.2171493 C28.9999375,7.38388169 32.134,4.27630423 36.00025,4.27630423 C39.8661875,4.27630423 42.9999375,7.38388169 42.9999375,11.2171493" id="Fill-1" fill="#FFAFBD"></path>
                  <path d="M34,8.17124146e-14 C35.104375,8.17124146e-14 36,0.895618639 36,1.9999858 L36,1.9999858 L36,8.99993608 L40,8.99993608 C43.30875,8.99993608 46,11.4355438 46,14.4286475 L46,14.4286475 L46,20.8998516 C46,22.0042187 45.104375,22.8998374 44,22.8998374 L44,22.8998374 L4,22.8998374 L4,38.0000426 C4,39.1028473 4.8971875,40.0003409 6,40.0003409 L6,40.0003409 L43.1721875,40.0003409 L38.5859375,35.414436 C37.8046875,34.6331915 37.8046875,33.3675755 38.5859375,32.5863311 C39.3671875,31.8050866 40.633125,31.8050866 41.414375,32.5863311 L41.414375,32.5863311 L49.4140625,40.5862742 C49.98625,41.1584577 50.1571875,42.0178266 49.8478125,42.7656338 C49.538125,43.512816 48.80875,44 48,44 L48,44 L6,44 C2.6915625,44 9.23705556e-14,41.3087691 9.23705556e-14,38.0000426 L9.23705556e-14,38.0000426 L9.23705556e-14,14.4286475 C9.23705556e-14,11.4355438 2.6915625,8.99993608 6,8.99993608 L6,8.99993608 L12,8.99993608 L12,1.9999858 C12,0.895618639 12.895625,8.17124146e-14 14,8.17124146e-14 C15.1046875,8.17124146e-14 16,0.895618639 16,1.9999858 L16,1.9999858 L16,8.99993608 L32.0003125,8.99993608 L32.0003125,1.9999858 C32.0003125,0.895618639 32.895625,8.17124146e-14 34,8.17124146e-14 Z M13.500125,28.999919 C14.88075,28.999919 16.000125,30.1192861 16.000125,31.4999013 C16.000125,32.8805165 14.88075,33.9998835 13.500125,33.9998835 C12.1195,33.9998835 11.000125,32.8805165 11.000125,31.4999013 C11.000125,30.1192861 12.1195,28.999919 13.500125,28.999919 Z M22.5000625,28.999919 C23.8806875,28.999919 25.0000625,30.1192861 25.0000625,31.4999013 C25.0000625,32.8805165 23.8806875,33.9998835 22.5000625,33.9998835 C21.1194375,33.9998835 20.0000625,32.8805165 20.0000625,31.4999013 C20.0000625,30.1192861 21.1194375,28.999919 22.5000625,28.999919 Z M31.5,28.999919 C32.8809375,28.999919 34,30.1192861 34,31.4999013 C34,32.8805165 32.8809375,33.9998835 31.5,33.9998835 C30.119375,33.9998835 29,32.8805165 29,31.4999013 C29,30.1192861 30.119375,28.999919 31.5,28.999919 Z M40,12.9999077 L6,12.9999077 C4.91625,12.9999077 4,13.654278 4,14.4286475 L4,14.4286475 L4,18.8998658 L42.0003125,18.8998658 L42.0003125,14.4286475 C42.0003125,13.654278 41.0840625,12.9999077 40,12.9999077 L40,12.9999077 Z" id="形状结合" fill="url(#linearGradient-1)"></path>
              </g>
          </g>
      </g>
  </svg> 
  `,
  me: `
  <?xml version="1.0" encoding="UTF-8"?>
  <svg width="50px" height="44px" viewBox="0 0 50 44" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <!-- Generator: Sketch 59.1 (86144) - https://sketch.com -->
      <title>C5C99B34-7D15-41E5-B80A-D9EAD0DAEA9D</title>
      <desc>Created with Sketch.</desc>
      <defs>
          <linearGradient x1="100%" y1="50%" x2="0%" y2="50%" id="linearGradient-1">
              <stop stop-color="#F2709C" offset="0%"></stop>
              <stop stop-color="#FF9472" offset="100%"></stop>
          </linearGradient>
      </defs>
      <g id="组件" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="icon/个人中心/未选中">
              <g id="编组" transform="translate(0.000000, -0.000000)">
                  <path d="M43.7577465,14.8788732 C43.7577465,18.6901408 40.6901408,21.7577465 36.8788732,21.7577465 C33.0676056,21.7577465 30,18.6901408 30,14.8788732 C30,11.0676056 33.0676056,8 36.8788732,8 C40.6901408,8 43.7577465,11.0676056 43.7577465,14.8788732" id="Fill-1" fill="#FFAFBD"></path>
                  <path d="M44.030567,30 C45.092297,30 46.154027,30.28125 47.1220749,30.875 C49.9325366,32.5625 50.8381298,36.25 49.1518528,39.09375 L49.1518528,39.09375 L46.8098014,43.03125 C46.4663005,43.65625 45.8105261,44 45.1235243,44 C44.7487961,44 44.4052952,43.90625 44.0930217,43.71875 C43.1562011,43.15625 42.8439276,41.90625 43.40602,40.96875 L43.40602,40.96875 L45.7480714,37.03125 C46.3101637,36.09375 45.9978902,34.84375 45.0610696,34.28125 C44.7487961,34.09375 44.3740679,34 44.030567,34 L44.030567,34 L5.24619522,34 C4.55919346,34 3.96587377,34.59375 3.96587377,35.3125 C3.96587377,35.53125 4.02832847,35.75 4.15323788,35.96875 L4.15323788,35.96875 L5.96442432,39.03125 C6.3079252,39.625 6.9636996,40 7.65070136,40 L7.65070136,40 L32.1641731,40 C33.2571304,40 34.1314963,40.90625 34.1314963,42 C34.1314963,43.09375 33.2571304,44 32.1641731,44 L32.1641731,44 L7.65070136,44 C5.58969609,44 3.62237289,42.90625 2.5606429,41.09375 L2.5606429,41.09375 L0.74945646,38.03125 C0.24981882,37.21875 0,36.28125 0,35.3125 C0,32.375 2.34205144,30 5.24619522,30 L5.24619522,30 Z M25,0 C32.15625,0 38,5.84375 38,13 C38,20.15625 32.15625,26 25,26 C17.84375,26 12,20.15625 12,13 C12,5.84375 17.84375,0 25,0 Z M25,4 C20.03125,4 16,8.03125 16,13 C16,17.96875 20.03125,22 25,22 C29.96875,22 34,17.96875 34,13 C34,8.03125 29.96875,4 25,4 Z" id="形状结合" fill="url(#linearGradient-1)"></path>
              </g>
          </g>
      </g>
  </svg>
  `,
  'home-focused': `
  <?xml version="1.0" encoding="UTF-8"?>
<svg width="50px" height="44px" viewBox="0 0 50 44" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 59.1 (86144) - https://sketch.com -->
    <title>F988ECA9-F02B-4316-8C58-F4ABA50D59DD</title>
    <desc>Created with Sketch.</desc>
    <g id="组件" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="icon/首页/已选中">
            <g id="编组">
                <path d="M46.9387755,10.2040816 C46.9387755,14.1492347 43.7407526,17.3469388 39.7959184,17.3469388 C35.8510842,17.3469388 32.6530612,14.1492347 32.6530612,10.2040816 C32.6530612,6.25924745 35.8510842,3.06122449 39.7959184,3.06122449 C43.7407526,3.06122449 46.9387755,6.25924745 46.9387755,10.2040816" id="Fill-1" fill="#FFAFBD"></path>
                <path d="M31,44 C29.895625,44 28.9996875,43.0906636 28.9996875,41.9689901 C28.9996875,40.8469992 29.895625,39.9373454 31,39.9373454 L37,39.9373454 C38.1021875,39.9373454 38.9996875,39.0257873 38.9996875,37.9063356 L38.9996875,25.2105401 C38.9996875,22.1295879 41.4678125,19.6237553 44.5,19.6237553 L45,19.6237553 C45.5515625,19.6237553 46,19.1679762 46,18.6080916 L46,17.8511048 C46,17.1452186 45.6296875,16.4790067 45.035,16.1130504 L25.91125,4.35991778 C25.2684375,3.96634812 24.4721875,3.96856988 23.83125,4.36531349 L4.955625,16.1051156 C4.365625,16.4717067 3.9996875,17.135062 3.9996875,17.8374569 L3.9996875,18.6080916 C3.9996875,19.1679762 4.4484375,19.6237553 5,19.6237553 L5.5,19.6237553 C8.5325,19.6237553 11,22.1295879 11,25.2105401 L11,37.9063356 C11,39.0257873 11.896875,39.9373454 13,39.9373454 L15,39.9373454 C16.1028125,39.9373454 17,39.0257873 17,37.9063356 L17,29.7807091 C17,26.4204494 19.69125,23.6867272 23,23.6867272 L31,23.6867272 C32.104375,23.6867272 32.9996875,24.596381 32.9996875,25.7180545 C32.9996875,26.8400454 32.104375,27.7496992 31,27.7496992 L23,27.7496992 C21.896875,27.7496992 21,28.6609399 21,29.7807091 L21,37.9063356 C21,41.2665952 18.3084375,44 15,44 L13,44 C9.69125,44 7,41.2665952 7,37.9063356 L7,25.2105401 C7,24.3700784 6.3271875,23.6867272 5.5,23.6867272 L5,23.6867272 C2.243125,23.6867272 0,21.4081493 0,18.6080916 L0,17.8374569 C0,15.7305896 1.0984375,13.7389367 2.866875,12.6401156 L21.7425,0.900948302 C23.6640625,-0.293726052 26.055625,-0.301343529 27.9825,0.884443768 L47.10625,12.6375764 C48.8915625,13.735128 50,15.7331288 50,17.8511048 L50,18.6080916 C50,21.4081493 47.756875,23.6867272 45,23.6867272 L44.5,23.6867272 C43.6728125,23.6867272 42.9996875,24.3700784 42.9996875,25.2105401 L42.9996875,37.9063356 C42.9996875,41.2665952 40.3084375,44 37,44 L31,44 Z" id="Fill-3" fill="#FFFFFF"></path>
            </g>
        </g>
    </g>
</svg>
  `,
  'baby-focused': `
  <?xml version="1.0" encoding="UTF-8"?>
<svg width="50px" height="44px" viewBox="0 0 50 44" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 59.1 (86144) - https://sketch.com -->
    <title>8EA862B8-1641-4FA9-857B-776A2EAC1F04</title>
    <desc>Created with Sketch.</desc>
    <g id="组件" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="icon/宝宝列表/已选中">
            <g id="编组">
                <path d="M41.5258657,10.8135593 C41.5258657,14.7262999 38.3983873,17.8983051 34.5405715,17.8983051 C30.6827558,17.8983051 27.5552774,14.7262999 27.5552774,10.8135593 C27.5552774,6.9008187 30.6827558,3.72881356 34.5405715,3.72881356 C38.3983873,3.72881356 41.5258657,6.9008187 41.5258657,10.8135593" id="Fill-1" fill="#FFAFBD"></path>
                <path d="M26.84,0 C26.85375,0 26.9590625,0.00124999112 26.9725,0.00187498668 C27.0165625,0.00281248002 27.0578125,0.0137499023 27.10125,0.0174998757 C27.1590625,0.0121874134 27.215,0 27.274375,0 C31.836875,0 35.54875,3.71184864 35.54875,8.27431623 C35.54875,12.8370963 31.836875,16.548945 27.274375,16.548945 C22.711875,16.548945 19,12.8370963 19,8.27431623 C19,7.16994908 19.895625,6.27433044 21,6.27433044 C22.104375,6.27433044 23,7.16994908 23,8.27431623 C23,10.6317995 24.9175,12.5489734 27.274375,12.5489734 C29.630625,12.5489734 31.54875,10.6317995 31.54875,8.27431623 C31.54875,5.91745797 29.630625,3.99997159 27.274375,3.99997159 C27.231875,3.99997159 27.191875,3.98997166 27.15,3.98715918 C27.0996875,3.99122165 27.05125,4.00215908 27,4.00215908 L27,4.00215908 L26.9815625,4.00215908 L26.9790625,3.9699718 C26.9328125,3.96309685 26.8853125,3.95965938 26.84,3.94934695 L26.84,3.94934695 L26.84,3.99997159 C18.4125,3.99997159 11.0521875,9.9543043 8.94125,18.4801812 C8.9240625,18.5511182 8.896875,18.6161178 8.8725,18.6829923 C8.859375,18.7192421 8.8503125,18.7570543 8.835,18.792054 C8.7865625,18.9051782 8.7284375,19.0120525 8.6615625,19.1117393 C8.65125,19.1276767 8.6378125,19.1408016 8.626875,19.1561139 C8.5678125,19.2392384 8.5040625,19.3179878 8.43375,19.3904873 C8.40625,19.4186121 8.3759375,19.4429869 8.346875,19.4692367 C8.2878125,19.5236113 8.2271875,19.5751735 8.1621875,19.6217356 C8.1246875,19.6486105 8.0859375,19.6726728 8.04625,19.6970476 C7.9828125,19.7361098 7.918125,19.7714221 7.8509375,19.8032969 C7.8078125,19.8236092 7.7653125,19.8432966 7.720625,19.8604839 C7.645,19.8898587 7.5671875,19.9126711 7.488125,19.9326709 C7.4496875,19.9423584 7.4125,19.9545458 7.373125,19.9620457 C7.2515625,19.9851706 7.1278125,20.0001705 7.0015625,20.0001705 C7.000625,20.0001705 6.9996875,19.999858 6.99875,19.999858 C5.3734375,20.0007954 4,21.8323449 4,24.000142 C4,26.1679391 5.3740625,28.0001136 7,28.0001136 C8.01375,28.0001136 8.8425,28.7572958 8.973125,29.7354138 C10.9371875,35.9122449 17.3421875,40.0215908 24.9703125,40.0000284 C32.779375,39.9678411 39.2528125,35.7247463 41.0790625,29.4416659 C41.09,29.4044787 41.1090625,29.3719789 41.121875,29.3360416 C41.1446875,29.2707296 41.1690625,29.2072926 41.19875,29.145418 C41.2271875,29.0851059 41.25875,29.0282313 41.2928125,28.9719817 C41.3246875,28.9185446 41.3584375,28.8669825 41.395,28.8172953 C41.4359375,28.7616707 41.4790625,28.7097961 41.525,28.659484 C41.5659375,28.6151093 41.6078125,28.5722971 41.6521875,28.5313599 C41.70125,28.4860477 41.751875,28.444798 41.8053125,28.4051108 C41.855625,28.366986 41.9075,28.3313613 41.9615625,28.298549 C42.015625,28.2654243 42.0709375,28.2360495 42.1278125,28.2082372 C42.186875,28.1794874 42.2465625,28.1532375 42.3090625,28.1304252 C42.3690625,28.1082379 42.4296875,28.0898005 42.4921875,28.0732381 C42.5540625,28.0569882 42.615625,28.0429258 42.6796875,28.0323009 C42.7490625,28.021051 42.8190625,28.015426 42.8896875,28.0113636 C42.926875,28.0091761 42.9621875,28.0001136 43,28.0001136 C44.6259375,28.0001136 46,26.1679391 46,24.000142 C46,21.8317199 44.6259375,19.999858 43,19.999858 C42.90875,19.999858 42.8209375,19.9845456 42.7328125,19.9726706 C42.6246875,19.990483 42.5165625,20.0001705 42.4090625,20.0001705 C41.5859375,20.0001705 40.814375,19.4879866 40.524375,18.6676799 C39.8525,16.7733184 38.6778125,15.0167683 37.0303125,13.4480295 C36.2303125,12.6861599 36.199375,11.4202314 36.9609375,10.6205496 C37.7215625,9.82055525 38.989375,9.79024297 39.788125,10.5514876 C41.528125,12.2086633 42.8578125,14.0549002 43.7678125,16.050511 C47.266875,16.4892579 50,19.8854838 50,24.000142 C50,27.8254274 47.636875,31.0282171 44.4925,31.8125866 C41.7271875,39.1159722 34.071875,43.9621878 24.986875,44 L24.986875,44 L24.8828125,44 C15.874375,44 8.238125,39.1481595 5.464375,31.8000866 C2.3415625,30.9972798 0,27.8079275 0,24.000142 C0,20.2017315 2.33,17.0198791 5.4409375,16.2067599 C8.4053125,6.60245311 17.0134375,0 26.84,0 Z M29.9712438,26.8474576 C31.0732987,26.8474576 31.9670421,27.7658528 31.9670421,28.8983051 C31.9670421,32.2911758 28.8330151,35.0508475 24.981748,35.0508475 C21.1298573,35.0508475 17.9964539,32.2911758 17.9964539,28.8983051 C17.9964539,27.7658528 18.8901973,26.8474576 19.9922522,26.8474576 C21.0943071,26.8474576 21.9880505,27.7658528 21.9880505,28.8983051 C21.9880505,29.9907018 23.3869804,30.9491525 24.981748,30.9491525 C26.5758919,30.9491525 27.9754455,29.9907018 27.9754455,28.8983051 C27.9754455,27.7658528 28.8691889,26.8474576 29.9712438,26.8474576 Z M17.6288068,19.3898305 C19.0500385,19.3898305 20.2023363,20.5585339 20.2023363,22 C20.2023363,23.4414661 19.0500385,24.6101695 17.6288068,24.6101695 C16.2075752,24.6101695 15.0552774,23.4414661 15.0552774,22 C15.0552774,20.5585339 16.2075752,19.3898305 17.6288068,19.3898305 Z M33.0699833,19.3898305 C34.4912149,19.3898305 35.6435127,20.5585339 35.6435127,22 C35.6435127,23.4414661 34.4912149,24.6101695 33.0699833,24.6101695 C31.6487517,24.6101695 30.4964539,23.4414661 30.4964539,22 C30.4964539,20.5585339 31.6487517,19.3898305 33.0699833,19.3898305 Z" id="形状结合" fill="#FFFFFF"></path>
            </g>
        </g>
    </g>
</svg>
  `,
  'visit-focused': `
  <?xml version="1.0" encoding="UTF-8"?>
<svg width="50px" height="44px" viewBox="0 0 50 44" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 59.1 (86144) - https://sketch.com -->
    <title>EBF29AE6-4CDE-4BCF-B550-FFD26A14FD54</title>
    <desc>Created with Sketch.</desc>
    <g id="组件" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="icon/家访记录/未选中备份">
            <g id="编组" transform="translate(-0.000063, 0.000000)">
                <path d="M42.9999375,11.2171493 C42.9999375,15.0504169 39.8661875,18.1579944 36.00025,18.1579944 C32.134,18.1579944 28.9999375,15.0504169 28.9999375,11.2171493 C28.9999375,7.38388169 32.134,4.27630423 36.00025,4.27630423 C39.8661875,4.27630423 42.9999375,7.38388169 42.9999375,11.2171493" id="Fill-1" fill="#FFAFBD"></path>
                <path d="M34,8.17124146e-14 C35.104375,8.17124146e-14 36,0.895618639 36,1.9999858 L36,1.9999858 L36,8.99993608 L40,8.99993608 C43.30875,8.99993608 46,11.4355438 46,14.4286475 L46,14.4286475 L46,20.8998516 C46,22.0042187 45.104375,22.8998374 44,22.8998374 L44,22.8998374 L4,22.8998374 L4,38.0000426 C4,39.1028473 4.8971875,40.0003409 6,40.0003409 L6,40.0003409 L43.1721875,40.0003409 L38.5859375,35.414436 C37.8046875,34.6331915 37.8046875,33.3675755 38.5859375,32.5863311 C39.3671875,31.8050866 40.633125,31.8050866 41.414375,32.5863311 L41.414375,32.5863311 L49.4140625,40.5862742 C49.98625,41.1584577 50.1571875,42.0178266 49.8478125,42.7656338 C49.538125,43.512816 48.80875,44 48,44 L48,44 L6,44 C2.6915625,44 9.23705556e-14,41.3087691 9.23705556e-14,38.0000426 L9.23705556e-14,38.0000426 L9.23705556e-14,14.4286475 C9.23705556e-14,11.4355438 2.6915625,8.99993608 6,8.99993608 L6,8.99993608 L12,8.99993608 L12,1.9999858 C12,0.895618639 12.895625,8.17124146e-14 14,8.17124146e-14 C15.1046875,8.17124146e-14 16,0.895618639 16,1.9999858 L16,1.9999858 L16,8.99993608 L32.0003125,8.99993608 L32.0003125,1.9999858 C32.0003125,0.895618639 32.895625,8.17124146e-14 34,8.17124146e-14 Z M13.500125,28.999919 C14.88075,28.999919 16.000125,30.1192861 16.000125,31.4999013 C16.000125,32.8805165 14.88075,33.9998835 13.500125,33.9998835 C12.1195,33.9998835 11.000125,32.8805165 11.000125,31.4999013 C11.000125,30.1192861 12.1195,28.999919 13.500125,28.999919 Z M22.5000625,28.999919 C23.8806875,28.999919 25.0000625,30.1192861 25.0000625,31.4999013 C25.0000625,32.8805165 23.8806875,33.9998835 22.5000625,33.9998835 C21.1194375,33.9998835 20.0000625,32.8805165 20.0000625,31.4999013 C20.0000625,30.1192861 21.1194375,28.999919 22.5000625,28.999919 Z M31.5,28.999919 C32.8809375,28.999919 34,30.1192861 34,31.4999013 C34,32.8805165 32.8809375,33.9998835 31.5,33.9998835 C30.119375,33.9998835 29,32.8805165 29,31.4999013 C29,30.1192861 30.119375,28.999919 31.5,28.999919 Z M40,12.9999077 L6,12.9999077 C4.91625,12.9999077 4,13.654278 4,14.4286475 L4,14.4286475 L4,18.8998658 L42.0003125,18.8998658 L42.0003125,14.4286475 C42.0003125,13.654278 41.0840625,12.9999077 40,12.9999077 L40,12.9999077 Z" id="形状结合" fill="#FFFFFF"></path>
            </g>
        </g>
    </g>
</svg>
  `,
  'me-focused': `
  <?xml version="1.0" encoding="UTF-8"?>
<svg width="50px" height="44px" viewBox="0 0 50 44" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 59.1 (86144) - https://sketch.com -->
    <title>DEDDB762-7E47-4787-8AD8-F0D11519F68E</title>
    <desc>Created with Sketch.</desc>
    <g id="组件" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="icon/个人中心/已选中">
            <g id="编组" transform="translate(0.000000, -0.000000)">
                <path d="M43.7577465,14.8788732 C43.7577465,18.6901408 40.6901408,21.7577465 36.8788732,21.7577465 C33.0676056,21.7577465 30,18.6901408 30,14.8788732 C30,11.0676056 33.0676056,8 36.8788732,8 C40.6901408,8 43.7577465,11.0676056 43.7577465,14.8788732" id="Fill-1" fill="#FFAFBD"></path>
                <path d="M44.030567,30 C45.092297,30 46.154027,30.28125 47.1220749,30.875 C49.9325366,32.5625 50.8381298,36.25 49.1518528,39.09375 L49.1518528,39.09375 L46.8098014,43.03125 C46.4663005,43.65625 45.8105261,44 45.1235243,44 C44.7487961,44 44.4052952,43.90625 44.0930217,43.71875 C43.1562011,43.15625 42.8439276,41.90625 43.40602,40.96875 L43.40602,40.96875 L45.7480714,37.03125 C46.3101637,36.09375 45.9978902,34.84375 45.0610696,34.28125 C44.7487961,34.09375 44.3740679,34 44.030567,34 L44.030567,34 L5.24619522,34 C4.55919346,34 3.96587377,34.59375 3.96587377,35.3125 C3.96587377,35.53125 4.02832847,35.75 4.15323788,35.96875 L4.15323788,35.96875 L5.96442432,39.03125 C6.3079252,39.625 6.9636996,40 7.65070136,40 L7.65070136,40 L32.1641731,40 C33.2571304,40 34.1314963,40.90625 34.1314963,42 C34.1314963,43.09375 33.2571304,44 32.1641731,44 L32.1641731,44 L7.65070136,44 C5.58969609,44 3.62237289,42.90625 2.5606429,41.09375 L2.5606429,41.09375 L0.74945646,38.03125 C0.24981882,37.21875 0,36.28125 0,35.3125 C0,32.375 2.34205144,30 5.24619522,30 L5.24619522,30 Z M25,0 C32.15625,0 38,5.84375 38,13 C38,20.15625 32.15625,26 25,26 C17.84375,26 12,20.15625 12,13 C12,5.84375 17.84375,0 25,0 Z M25,4 C20.03125,4 16,8.03125 16,13 C16,17.96875 20.03125,22 25,22 C29.96875,22 34,17.96875 34,13 C34,8.03125 29.96875,4 25,4 Z" id="形状结合" fill="#FFFFFF"></path>
            </g>
        </g>
    </g>
</svg>
  `,
  arrow: `
  <?xml version="1.0" encoding="UTF-8"?>
  <svg width="12px" height="20px" viewBox="0 0 12 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <!-- Generator: Sketch 59.1 (86144) - https://sketch.com -->
      <title>CC3409D4-5738-4525-A0B5-59E9EA63A654</title>
      <desc>Created with Sketch.</desc>
      <g id="组件" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="icon/卡片箭头/白" fill="#FFFFFF">
              <path d="M1.999975,20.000025 C1.488225,20.000025 0.976475,19.804775 0.58585,19.41415 C-0.195275,18.632775 -0.195275,17.367275 0.58585,16.586025 L7.171725,9.999775 L0.58585,3.414025 C-0.195275,2.63315 -0.195275,1.36665 0.58585,0.5859 C1.366225,-0.195225 2.633725,-0.195225 3.413975,0.5859 L11.41385,8.585775 C12.1951,9.366525 12.1951,10.633025 11.41385,11.41415 L3.413975,19.41415 C3.02385,19.804775 2.5116,20.000025 1.999975,20.000025" id="Fill-1"></path>
          </g>
      </g>
  </svg>
  `,
};

export default function Icons({ name, size = 30, style }) {
  return svgs[name] ? (
    <SvgXml
      style={style}
      xml={svgs[name]}
      width={px2dp(size)}
      height={px2dp(size)}
    />
  ) : (
    <Text>{name}</Text>
  );
}
