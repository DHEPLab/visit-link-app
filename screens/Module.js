import React from 'react';
import { ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { styled } from '../utils/styled';
import { Colors } from '../constants';
import { Button } from '../components';
import { useNavigation } from '@react-navigation/native';
import Text from '../components/curriculum/Text';
import Media from '../components/curriculum/Media';

const components = [
  {
    type: 'Text',
    key: 1596027303992,
    value: {
      html:
        '<p><span style="color: rgb(0, 176, 80);">1.请妈妈看讲义H4.2“心理健康三大支柱”，一起看妈妈在喝水的那张图，并告诉她</span></p>',
      type: 'instruction',
    },
  },
  {
    type: 'Text',
    key: 1596027550001,
    value: {
      html:
        '<ul><li><span style="color: rgb(0, 112, 192);">孕妇和照料人如果压力太大，会经常注意不到自己的个人健康，像是饮食、运动和休息等各个方面。</span></li><li><span style="color: rgb(0, 112, 192);">一般很多妈妈感到心理压力大或者情绪不好的时候，就容易就不想做事不想动，就有可能没有精力去操心自己和宝宝的健康，假如出现啥子问题本来应该去看医生的，可能就注意不到了或者没得心情去医院。这样的话就会进一步影响身体健康，让情况变得越来越不好。</span></li><li><span style="color: rgb(0, 112, 192);">这个问题对孕妇来说更重要。妈妈如果情绪抑郁、焦虑或者心理压力大，可能会引起内分泌紊乱，影响胎儿发育，导致宝宝出生时瘦小、宝宝爱哭、容易生气、体质不好等等。 </span></li></ul><p><span style="color: rgb(0, 112, 192);">          后面的课程会重点讨论怎么改善身体健康和保持好的心情。</span></p>',
      type: 'script',
    },
  },
  {
    type: 'Text',
    key: 1596027640176,
    value: {
      html:
        '<p><span style="color: rgb(0, 176, 80);">让孕妇看着图1读出描述她想法的文字。 </span></p><p><span style="color: rgb(0, 176, 80);">和孕妇讨论一下，有哪些情况可能导致这种想法产生。</span></p>',
      type: 'instruction',
    },
  },
  {
    type: 'Media',
    key: 1596027609008,
    value: {
      file: '/48790439159c4871afca779968afe9bd.png',
      text: ' 图1：“我对目前的状况无能为力，没有办法改善自己的健康状况。”',
      type: 'PICTURE',
    },
  },
  {
    type: 'Text',
    key: 1596027665249,
    value: {
      html:
        '<p><span style="color: rgb(0, 176, 80);">可能的原因有：</span></p><p><span style="color: rgb(112, 48, 160);">·&nbsp;家庭问题</span></p><p><span style="color: rgb(112, 48, 160);">·&nbsp;离家太远</span></p><p><span style="color: rgb(112, 48, 160);">·&nbsp;丈夫不在身边</span></p><p><span style="color: rgb(112, 48, 160);">·&nbsp;经济压力较大</span></p><p><span style="color: rgb(112, 48, 160);">·&nbsp;社会压力或孤单</span></p>',
      type: 'refrence',
    },
  },
  {
    type: 'Text',
    key: 1596027715921,
    value: {
      html:
        '<p><span style="color: rgb(0, 176, 80);">请孕妇看图3。讨论一下妈妈如果不积极解决抑郁的问题会带来哪些后果；</span></p>',
      type: 'instruction',
    },
  },
  {
    type: 'Media',
    key: 1596027723356,
    value: {
      file: '/bd8650ba81d04a9dade06248c1197fc6.png',
      text: '图3：烦恼、压力和抑郁非常不利于妈妈和宝宝的健康状况。',
      type: 'PICTURE',
    },
  },
  {
    type: 'Text',
    key: 1596027742984,
    value: {
      html: '<p><span style="color: rgb(0, 176, 80);">告诉她：</span></p>',
      type: 'instruction',
    },
  },
  {
    type: 'Text',
    key: 1596027758880,
    value: {
      html:
        '<p><span style="color: rgb(0, 112, 192);">人们在遇到压力和烦恼的问题时，想放弃、退缩是非常自然的反应；但是，如果不去想办法解决，心情抑郁对妈妈和宝宝的健康是很不利的。比如说，怀孕的妈妈如果感到绝望或压力巨大，可能就会吃不好、不去定期检查，就会增加自己和宝宝患病的风险。这就是为什么要尽早发现一些有害身心健康的不好的情绪的原因，因为只有发现了，我们才能采取相应的行动来做出改变。&nbsp;</span></p>',
      type: 'script',
    },
  },
];

export default function Module() {
  const navigation = useNavigation();
  return (
    <>
      <Header {...Colors.linearGradient}>
        <Escape>
          <Button text title="退出模块" onPress={navigation.goBack} />
        </Escape>
        <Name>照料人的心理健康</Name>
        <Description>
          介绍本次模块：怀了宝宝，全家人肯定很高兴，但这种生活的突然改变也可能会让很多孕妇妈妈感觉很难应对，产生消极的情绪，这是完全正常的现象。重要的是，你要了解这段时间自己内心的感受，感觉压力很大、或者情绪不好的时候晓得自己该怎么办，不让这些不好的情绪影响你照顾好自己和宝宝。
        </Description>
      </Header>
      <StyledScrollView>
        <ModuleCard>
          {/* <Text value={{ type: 'instruction', html: '<b>abc</b>' }} />
          <Text value={{ type: 'script', html: '<p>123</p><b>abc</b>' }} />
          <Text value={{ type: 'reference', html: '<p>123</p><b>abc</b>' }} />
          <Media
            value={{
              type: 'Video',
              file: 'https://interactive-examples.mdn.mozilla.net/media/examples/flower.mp4',
              text: '花开的时候',
            }}
          />
          <Media
            value={{
              type: 'Picture',
              file:
                'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1089874897,1268118658&fm=26&gp=0.jpg',
              text: '快乐的一只小青蛙',
            }}
          /> */}
          {components.map((component) => (
            <ModuleComponent key={component.key} component={component} />
          ))}
        </ModuleCard>
        <ButtonContainer>
          <Button size="large" title="下一步" />
          <LastStepButton>
            <Button info title="上一步" />
          </LastStepButton>
        </ButtonContainer>
      </StyledScrollView>
    </>
  );
}

function ModuleComponent({ component }) {
  let As;
  switch (component.type) {
    case 'Text':
      As = Text;
      break;
    case 'Media':
      As = Media;
      break;
  }
  return <As value={component.value} />;
}

const Escape = styled.View`
  position: absolute;
  right: 28px;
  top: 20px;
  z-index: 10;
`;

const LastStepButton = styled.View`
  margin-top: 10px;
`;

const ButtonContainer = styled.View`
  margin-top: 20px;
  margin-bottom: 40px;
`;

const StyledScrollView = styled(ScrollView)`
  padding: 20px 28px;
`;

const ModuleCard = styled.View`
  padding: 20px 24px;
  border-radius: 8px;
  background: #fff;
`;

const Description = styled.Text`
  font-size: 10px;
  color: #fff;
  margin-top: 6px;
`;

const Name = styled(Description)`
  font-weight: bold;
  margin-top: 12px;
`;

const Header = styled(LinearGradient)`
  padding: 0 28px;
  padding-top: 10px;
  min-height: 84px;
  padding-bottom: 10px;
  width: 100%;
`;
