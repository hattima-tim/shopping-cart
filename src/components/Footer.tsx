import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#181e24] px-4 py-8 md:px-8 lg:px-20">
      <div className="flex flex-col justify-center gap-8 md:flex-row md:gap-8 lg:flex-row lg:gap-24">
        <div className="flex flex-col gap-3 text-[#e3e3e4] md:gap-4 lg:gap-4">
          <h3 className="ml-0">CONTACT US</h3>
          <Link to='/contact'>Formik Form</Link>
          <p> Uttarkhan, Uttara, Dhaka 1230</p>
          <p>+8809613-827080</p>
          <p>oneummahbd@gmail.com</p>
        </div>

        <div className="flex flex-col gap-3 text-[#e3e3e4] md:gap-4 lg:gap-4">
          <h3 className="ml-0">COMPANY</h3>
          <p>Who We Are</p>
          <p>Our Stores</p>
          <p>Become an Affiliate</p>
          <p>Invest Money</p>
          <p>Sell Your Design</p>
        </div>
        <div className="flex flex-col gap-3 text-[#e3e3e4] md:gap-4 lg:gap-4">
          <h3 className="ml-0">LEGAL</h3>
          <p>Terms & Conditions</p>
          <p>Privacy Policy</p>
          <p>Return Policy</p>
          <p>Security</p>
        </div>
        <div className="flex flex-col gap-3 text-[#e3e3e4] md:gap-4 lg:gap-4">
          <h3 className="ml-0">PAYMENT US</h3>
          <img
            src="https://res.cloudinary.com/du3oueesv/image/upload/v1663384469/shopping%20cart/SSLCommerz-Pay-With-logo-All-Size-01-1400x173_vrl0eh.png"
            alt="sslcommerz"
            className="md:max-w-[10rem] lg:max-w-xs"
          />
        </div>
      </div>
      <div className="mt-10 flex items-center justify-center">
        <p className="text-[#e3e3e4]">Copyright © 2022 oneummahbd.com</p>
      </div>
    </footer>
  );
}

export default Footer;
