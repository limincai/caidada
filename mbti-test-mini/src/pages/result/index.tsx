import { Image, View } from "@tarojs/components";
import { AtButton } from "taro-ui";
import Taro from "@tarojs/taro";
import "./index.scss";
import headerBg from "../../assets/headerBg.png";
import GlobalFooter from "../../components/GlobalFooter";
import questionResults from "../../data/questionResults.json";
import questions from "../../data/questions.json";
import { getBestQuestionResult } from "../../utils/bizUtils";

/**
 * 查看结果页面
 */
export default () => {
  const answerList = Taro.getStorageSync("answerList");

  if (!answerList || answerList.length < 1) {
    Taro.showToast({
      title: "答案为空",
      duration: 3000,
      icon: "error",
    });

    // 测试结果
    const result = getBestQuestionResult(
      answerList,
      questions,
      questionResults
    );

    return (
      <View className="resultPage">
        <View className="at-article__h1 title">{result.resultName}</View>
        <View className="at-article__h2 subTitle">{result.resultDesc}</View>
        <AtButton
          className="enterBtn"
          type="primary"
          size="normal"
          circle
          onClick={() => {
            Taro.reLaunch({ url: "/pages/index/index" });
          }}
        >
          返回主页
        </AtButton>
        <Image className="headerBg" src={headerBg} />
        <GlobalFooter />
      </View>
    );
  }
};
