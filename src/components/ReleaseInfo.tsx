import howToUse from '../assets/howToUse.mp4';

const ReleaseInfo = () => {
  return (
    <>
      <table>
        <tr>
          <th>Version</th>
          <th>Updated</th>
        </tr>
        <tr>
          <td>1.0.1</td>
          <td>式量を求めるだけの電卓を優先的に公開</td>
        </tr>
        <tr>
          <td>1.0.2</td>
          <td>Redux(状態管理ライブラリ)のテスト</td>
        </tr>
        <tr>
          <td>1.1.1</td>
          <td>ByMassの解放</td>
        </tr>
        <tr>
          <td>2.0.1 ←今ココ</td>
          <td>全解放・レイアウト整理</td>
        </tr>
      </table>

      <p>How To Use</p>
      <video src={howToUse}></video>
    </>
  );
};

export default ReleaseInfo;