import howToUse from '../assets/howToUse.mp4';

const ReleaseInfo = () => {
  return (
    <section className="manual">
      <table>
        <thead>
          <tr>
            <th>Version</th>
            <th>Updated</th>
          </tr>
        </thead>

        <tbody>
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
        </tbody>
      </table>

      <p style={{ margin: '15px', fontSize: '1.5rem', fontWeight: 'bold' }}>How To Use</p>
      <video controls={true}>
        <source src={howToUse} />
      </video>
    </section>
  );
};

export default ReleaseInfo;