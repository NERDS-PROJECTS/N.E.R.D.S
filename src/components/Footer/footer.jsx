import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
      {/* Mobile Footer */}
      <footer className="md:hidden  flex flex-col items-center">
        <div
          className="w-[100vw] h-[40rem] bg-cover absolute  bg-no-repeat"
          style={{
            backgroundImage:
              'url("https://res.cloudinary.com/dagggqd6g/image/upload/f_auto,q_auto/snbxytf8s0dtah96wnlo")',
          }}
        >
          <div className="w-full pl-2 pr-2 pb-8 h-50rem flex flex-col items-center justify-start backdrop-blur-[9px] bg-white/10 shadow-md">
            <div
              id="logo"
              className="w-full pl-6 flex justify-start mt-12 md:mt-4"
            >
              <a href="/">
                <img
                  src="https://res.cloudinary.com/dqmktpekh/image/upload/f_auto,q_auto/npansp6k2ntw7qeoqoms"
                  alt="Logo"
                  className="w-28 h-28 cursor-pointer"
                />
              </a>
            </div>
            <div className="font-spaced pl-8 flex-wrap text-xl mt-[-5rem] ml-20 mb-20 justify-end sm:mt-[-4] text-white font-semibold">
              N.E.R.D.S NIT Silchar
            </div>

            <div className="flex pl-2 pr-2 flex-col justify-start items-start ml-[-7rem] mt-4">
              <p className="font-ethenocentric text-white text-md font-extralight">
                Wanna know more?
              </p>
              <input
                type="email"
                placeholder="Email us here"
                className="mt-4 bg-[#3E3E3E] text-white text-sm w-[100%] max-w-xs p-2 border-2 border-gray-600 outline-none rounded-none"
                style={{
                  clipPath:
                    "polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%)",
                }}
              />
              <p className="text-base text-white font-spaced font-extralight mt-3">
                Or contact us{" "}
                <Link className="text-blue-500 underline" to="/contact">
                  here
                </Link>
              </p>
            </div>

            <div className="relative w-full mt-6">
              <div className="flex flex-col items-star pl-8 md:ml-[-2.8rem]">
                <p className="text-white font-ethenocentric leading-3 font-extralight text-md">
                  Visit Us
                </p>
                <p className="text-white leading-7 font-spaced text-sm font-extralight">
                  <a
                    href="https://maps.app.goo.gl/3bCXg1WyDSQ3rduD8"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    NIT Silchar, Silchar, Assam, India- 788010
                  </a>
                </p>
                <p className="text-white font-extralight flex-wrap font-spaced text-sm">
                  <a href="mailto:nerds@nits.ac.in?subject=Hello%20N.E.R.D.S TEAM">
                    Email- nerds@nits.ac.in
                  </a>
                </p>
                <p className="text-white font-extralight font-spaced text-[14px]">
                  +91-60031 XXXXX
                </p>
              </div>

              <div className="absolute right-4 -top-36 flex flex-col gap-5">
                <a
                  target="_blank"
                  href="https://www.facebook.com/roboticsclub.nits?mibextid=ZbWKwL"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <img
                    src="https://res.cloudinary.com/dagggqd6g/image/upload/f_auto,q_auto/viuomoqgmkofttwlli8v"
                    alt="Facebook"
                    style={{ height: '28px' }}
                  />
                </a>
                <a
                  target="_blank"
                  href="https://www.instagram.com/nerds.nitsilchar?igsh=MTM0MjFpZjF6M3Zucg=="
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <img
                    src="https://res.cloudinary.com/dagggqd6g/image/upload/f_auto,q_auto/udtuzvgwajqwjozwqzwr"
                    alt="Instagram"
                    style={{ height: '28px' }}
                  />
                </a>
                <a
                  target="_blank"
                  href="https://www.linkedin.com/company/n-e-r-d-s-nits/"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <img
                    src="https://res.cloudinary.com/dagggqd6g/image/upload/f_auto,q_auto/t1gyihfapsxp6huydy8x"
                    alt="LinkedIn"
                    style={{ height: '28px' }}
                  />
                </a>
                <a
                  target="_blank"
                  href="https://www.youtube.com/@NERDSRoboticsNITS"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <img
                    src="https://res.cloudinary.com/dagggqd6g/image/upload/f_auto,q_auto/wdw8e75uvlzubpatqkri"
                    alt="Youtube"
                    style={{ height: '28px' }}
                  />
                </a>
                <a
                  target="_blank"
                  href="https://medium.com/@nerds_86525"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Medium_logo_Monogram.svg/1200px-Medium_logo_Monogram.svg.png"
                    alt="Medium"
                    style={{ height: '28px' }}
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-10 font-spaced text-center">
            <h1 className="text-white flex-wrap p-4 font-spaced font-bold text-[1rem]">
              © 2024 N.E.R.D.S. NIT Silchar. All Rights Reserved.
            </h1>
          </div>
        </div>
      </footer>

      {/* Desktop Footer */}
      <div className="hidden md:block relative w-full">
        <div
          id="background"
          className="w-screen h-[371px] absolute top-0 left-0 bg-cover bg-no-repeat opacity-100"
          style={{
            backgroundImage:
              'url("https://res.cloudinary.com/dqmktpekh/image/upload/f_auto,q_auto/fwwdfzvguihdknv6zbxt")',
          }}
        >
          <div className="w-full h-full opacity-100 flex items-center justify-center backdrop-blur-[40px] bg-white/10 shadow-md">
            <div className="flex flex-row items-start justify-between w-full max-w-6xl px-8">
              <div className="flex items-start space-x-16">
                <div id="logo" className="flex-shrink-0">
                  <a href="/">
                    <img
                      src="https://res.cloudinary.com/dqmktpekh/image/upload/f_auto,q_auto/npansp6k2ntw7qeoqoms"
                      className="w-28 h-28 cursor-pointer"
                      alt="N.E.R.D.S Logo"
                    />
                  </a>
                </div>

                <div id="wanna" className="mt-4">
                  <p className="font-ethenocentric text-white text-[16.2px] h-[29px] font-light">
                    Wanna know more?
                  </p>
                  <input
                    type="email"
                    placeholder="Email us here"
                    className="mt-5 bg-[#3E3E3E] text-white text-sm p-2 border-2 border-gray-600 outline-none"
                    style={{
                      width: '20rem',
                      clipPath: 'polygon(15px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 15px)'
                    }}
                  />
                  <p className="text-base text-white font-spaced mt-3">
                    Or contact us{" "}
                    <Link className="text-blue-500 underline" to="/contact">
                      here
                    </Link>
                  </p>
                </div>
              </div>

              <div className="flex space-x-16">
                <div id="visit_us" className="mt-4 ">
                  <p className="text-white font-ethenocentric  text-[16.2px] font-bold">
                    Visit Us
                  </p>
                  <p className="text-white mt-5 font-spaced text-[14px]">
                    <a
                      href="https://maps.app.goo.gl/3bCXg1WyDSQ3rduD8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-light hover:underline"
                    >
                      NIT Silchar, Silchar, Assam, India- 788010
                    </a>
                  </p>
                  <p className="text-white mt-3 font-spaced text-[14px]">
                    <a
                      href="mailto:nerds@nits.ac.in?subject=Hello%20N.E.R.D.S TEAM"
                      className="font-light hover:underline"
                    >
                      Email- nerds@nits.ac.in
                    </a>
                  </p>
                  <p className="text-white mt-3 font-spaced text-[14px] font-light">
                    +91-60031 XXXXX
                  </p>
                </div>

                <div id="socials" className="flex flex-col gap-10 mt-4">
                  <a
                    target="_blank"
                    href="https://www.facebook.com/roboticsclub.nits?mibextid=ZbWKwL"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <img
                      src="https://res.cloudinary.com/dagggqd6g/image/upload/f_auto,q_auto/viuomoqgmkofttwlli8v"
                      alt="Facebook"
                      style={{ height: '23px' }}
                    />
                  </a>
                  <a
                    target="_blank"
                    href="https://www.instagram.com/nerds.nitsilchar?igsh=MTM0MjFpZjF6M3Zucg=="
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <img
                      src="https://res.cloudinary.com/dagggqd6g/image/upload/f_auto,q_auto/udtuzvgwajqwjozwqzwr"
                      alt="Instagram"
                      style={{ height: '23px' }}
                    />
                  </a>
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/company/n-e-r-d-s-nits/"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <img
                      src="https://res.cloudinary.com/dagggqd6g/image/upload/f_auto,q_auto/t1gyihfapsxp6huydy8x"
                      alt="Linkedin"
                      style={{ height: '23px' }}
                    />
                  </a>
                  <a
                    target="_blank"
                    href="https://www.youtube.com/@NERDSRoboticsNITS"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <img
                      src="https://res.cloudinary.com/dagggqd6g/image/upload/f_auto,q_auto/wdw8e75uvlzubpatqkri"
                      alt="Youtube"
                      style={{ height: '23px' }}
                    />
                  </a>
                  <a
                    target="_blank"
                    href="https://medium.com/@nerds_86525"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Medium_logo_Monogram.svg/1200px-Medium_logo_Monogram.svg.png"
                      alt="Medium"
                      style={{ height: '23px' }}
                    />
                  </a>
                </div>
              </div>
            </div>

          </div>
          <div className="w-full h-[25%] flex flex-row justify-center" style={{
            backgroundImage: 'url("https://res.cloudinary.com/dqmktpekh/image/upload/f_auto,q_auto/fwwdfzvguihdknv6zbxt")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>
            <div className="w-full h-full flex items-center justify-center bg-black/50">
              <p className="text-white font-spaced font-bold text-sm mt-6">
                © 2024 N.E.R.D.S. NIT Silchar. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
