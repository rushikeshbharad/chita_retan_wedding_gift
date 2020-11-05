import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './App.css';

const sendMail = (to_email, name, otp = "Zala") => {
  const data = {
    'service_id': 'service_5a3oa5r',
    'template_id': 'template_l1s8cte',
    'user_id': 'user_RdWW2nztkB00yaeej5tv8',
    'template_params': {
      'to_email': to_email,
      'name': name,
      'otp': otp
    }
  }

  return new Promise((resolve) => {
    fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((r) => r.text())
      .then(() => {
        resolve();
      })
  })
}

const sendSMS = (number, otp = "Zala") => {
  return new Promise((resolve) => {
    fetch('https://textbelt.com/text', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: number,
        message: `OTP for claiming the wedding gift is: ${otp}`,
        key: 'textbelt',
      }),
    }).then(response => {
      return response.json();
    }).then(data => {
      resolve(data);
    });
  });
}

const App = () => {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState(new Date("2020-01-01"));
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState("");
  // TODO: remove below log
  console.log("otpSent haag => ", otpSent);

  useEffect(() => {
    if (localStorage.getItem("success")) {
      setStep(3);
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {{
          1: (
            <>
              <p>
                Happy married life <strong>👫</strong>
              </p>
              <p className="subtitle">
                {`Where is the gift?
                Simple!
                Select the wedding date and claim it`}
              </p>
              <DatePicker selected={date} onChange={setDate} />
              <span
                className="App-link"
                onClick={async () => {
                  if (
                    date.getDate() === 27 &&
                    date.getMonth() === 10 &&
                    date.getFullYear() === 2020
                  ) {
                    const createOtp = Math.round(Math.random() * 10000000);
                    setOtpSent(createOtp);
                    setStep(2);
                    // TODO: Remove below 3 comments
                    // sendMail("nikumbhrita@gmail.com", "Rita", createOtp);
                    // sendMail("chetanvc991@gmail.com", "Chetan", createOtp);
                    // sendSMS("+919405938483", createOtp);
                  }
                }}
              >
                Claim
              </span>
            </>
          ),
          2: (
            <>
              <p>
                Enter OTP
              </p>
              <p className="subtitle">
                {`
                One time password has been sent to
                - ni*******ta@gmail.com,
                - ch*******91@gmail.com,
                - 94******83
                
                DO NOT RELOAD THE PAGE`}
              </p>
              <input
                value={otp.split("").join("-")}
                onChange={(e) => setOtp(e.target.value.replace(/-/g, ""))}
                placeholder="0-0-0-0-0-0-0"
              />
              <span
                className="App-link"
                onClick={() => {
                  if (+otp === +otpSent) {
                    setStep(3);
                    // TODO: remove below comment
                    // sendMail("rushicbharad@gmail.com", "Rushi");
                    localStorage.setItem("success", "true");
                  }
                }}
              >
                Submit
              </span>
            </>
          ),
          3: (
            <>
              <p>
                Congratulations 🎉
              </p>
              <p className="subtitle">
                {`Honeymoon fund has been initialized!
                The amount will be credited
                to ICICI 04********55
                within 24 hours`}
              </p>
            </>
          )
        }[step]}
      </header>
    </div>
  );
}

export default App;
