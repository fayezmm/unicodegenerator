'use strict'

const title = "خدمة تحويل النص";
const description = "مرحبًا في موقعنا الفريد الذي يمكنك من تحويل نصوصك إلى أعمال فنية مذهلة باستخدام حروف يونيكودية. فقط أدخل النص، اضغط على زر التحويل، وشاهد كيف يتحوّل النص إلى شكل مبهر من الحروف الخاصة. تعبّر عن إبداعك الخاص واستمتع بتحويل النصوص بسهولة وتميز. ابدأ الآن!";

function Header({ title }) {
  return <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
      <svg className="bi me-2" width="40" height="32"><use xlinkHref="./assets/img/icons.svg#bootstrap"></use></svg>
      <span className="fs-4">{title}</span>
    </a>

    <ul className="nav nav-pills">
      <li className="nav-item"><a href="#" className="nav-link active" aria-current="page">الرئيسية</a></li>
    </ul>
  </header>;
}

function Hero({ title, description }) {
  return <div className="px-2 py-2 my-2 text-center">
    <img className="d-block mx-auto mb-4" src="./assets/img/logo.svg" alt="" width="72" height="57" />
    <h1 className="display-5 fw-bold text-body-emphasis">{title}</h1>
    <div className="col-lg-8 mx-auto">
      <p className="lead mb-4">{description}</p>
    </div>
  </div>;
}

function Tabs() {
  return <ul className="nav nav-tabs">
    <li className="nav-item">
      <a className="nav-link active" aria-current="page" href="#">نص مزخرف</a>
    </li>
    <li className="nav-item">
      <a className="nav-link disabled" aria-disabled="true">...</a>
    </li>
  </ul>;
}

function encodeOne(code) {
  const add = 0xdda5;
  const prefix = 0xd83c;
  const suffix = 0xfe0f;
  let result = "";
  result += String.fromCharCode(prefix);
  result += String.fromCharCode(code + add);
  result += String.fromCharCode(suffix);
  return result;
}

function endode(str) {
  const min = 0x41;
  const max = 0x5a;
  let result = "";

  for (let i = 0; i < str.length; i++) {
    let code = str.charCodeAt(i);
    if (code >= min && code <= max) {
      result += encodeOne(code);
    } else {
      result += String.fromCharCode(code);
    }
  }

  return result;
}

function Form() {

  const [orignalText, setOrignalText] = React.useState("");
  const [encodedText, setEncodedText] = React.useState("");

  const handleChange = () => {
    let endoded = endode(orignalText);
    setEncodedText(endoded);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(encodedText);
  };

  const handleClear = () => {
    setOrignalText("");
    setEncodedText("");
  };

  const handleOrignalTextChange = React.useCallback((event) => {
    setOrignalText(event.currentTarget.value);
  }, [setOrignalText]);

  return <div className="container my-4">
    <div className="row g-3 justify-content-center">
      <p>استخدم الأحرف الانلجيزية الكبيرة للحصول على افضل نتيجة</p>
      <div className="col-4">
        <textarea className="form-control" rows="7" wrap="soft" autoComplete="off" spellCheck="false" placeholder="ادخل النص المراد تحويله..." value={orignalText} onChange={handleOrignalTextChange}></textarea>
      </div>
      <div className="col-2">
        <div className="d-grid gap-3">
          <button className="btn btn-primary btn-lg" onClick={handleChange} disabled={!orignalText}>تحويل &gt;</button>
          <button className="btn btn-primary btn-lg" onClick={handleCopy} disabled={!encodedText}>نسخ</button>
          <button className="btn btn-primary btn-lg" onClick={handleClear} disabled={!orignalText}>امسح</button>
        </div>
      </div>
      <div className="col-4">
        <textarea className="form-control" rows="7" wrap="soft" autoComplete="off" spellCheck="false" placeholder="" value={encodedText} readOnly={true}></textarea>
      </div>
    </div>
  </div >;
}

function Main() {
  return <div className="container">
    <Header title={title} />
    <Hero title={title} description={description} />
    <div className="row mx-1">
      <Tabs />
      <Form title={title} description={description} />
    </div>
  </div>;
}

const domNode = document.getElementById("app");
const root = ReactDOM.createRoot(domNode);
root.render(<Main />);

