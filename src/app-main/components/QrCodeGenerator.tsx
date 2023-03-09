import {FormEvent, useState} from "react";
import QRCode from "qrcode.react";

type QrCodeGeneratorProps = {
  url: string;
}
const QrCodeGenerator = (props: QrCodeGeneratorProps) => {
  const { url } = props;
  // const [url, setUrl] = useState('');
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    // setUrl(e.currentTarget.value);
  }
  return <div>
    <input type='text' value={url} onChange={handleChange} />
    <br />
    <QRCode value={url} />
  </div>

}

export default QrCodeGenerator;
