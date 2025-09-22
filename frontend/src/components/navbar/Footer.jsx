
// const Footer = () => {
//     return (
//         <div className=" bg-orange-50">

//         <div className="mt-5 w-full mb-5 flex justify-evenly p-1">

//            <div>
//             <h2 className="font-bold text-lg">Support</h2>
//             <ul>
//                 <li>Help Center</li>
//                 <li>Report an issue</li>
//                 <li>Disability Support</li>
//                 <li>Cancellation Option</li>
//             </ul>
//            </div>

//            <div>
//             <h2 className="font-bold text-lg">Hosting</h2>
//             <ul>
//                 <li>Hosting Responsibility</li>
//                 <li>Community Forum</li>
//                 <li>Hosting Resources</li>
//                 <li>Join a free Hosting Class</li>
//                 <li>Find a co-host</li>
//             </ul>
//            </div>

//            <div>
//             <h2 className="font-bold text-lg">About OneRoof</h2>
//             <ul>
//                 <li>Career</li>
//                 <li>Investors</li>
//                 <li>Newsletter</li>
//             </ul>
//            </div>

//         </div>

//          <div className="flex justify-center gap-5">
            
//             <div>
//               <a 
//               href="https://www.instagram.com/lamejokes_08?igsh=MmNlcThhbDdpaXo2"
//               target="_blank"
//                rel="noopener noreferrer"
//               >
//                  <i class="fa-brands fa-square-instagram"></i>
//               </a>
//             </div>

//             <div>
//                 <a href="https://x.com/Abhijit_091"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 >
//                     <i class="fa-brands fa-square-x-twitter"></i>
//                 </a>
//             </div>

//             <div>
//                 <a href="https://www.linkedin.com/in/abhijit-ghosh-63b624235/"
//                 target="_blank"
//                  rel="noopener noreferrer"
//                 >

//               <i class="fa-brands fa-linkedin"></i>
//                 </a>
//             </div>

//             <div>
//                 <a href="https://www.reddit.com/user/Open_Ad4468/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 >
                

//               <i class="fa-brands fa-square-reddit"></i>
//                 </a>
//             </div>

//          </div>

//          <h4 className="text-center mt-4"> 
//             &#169; Oneroof Private Limited
//             </h4>

//         </div>
//     )
// };

// export default Footer;



const Footer = () => {
  return (
    <footer className="bg-orange-50 text-gray-700 py-10 px-6 mt-5">
      {/* Top Links Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <h2 className="font-bold text-lg mb-3">Support</h2>
          <ul className="space-y-2">
            <li className="hover:text-orange-600 cursor-pointer">Help Center</li>
            <li className="hover:text-orange-600 cursor-pointer">Report an issue</li>
            <li className="hover:text-orange-600 cursor-pointer">Disability Support</li>
            <li className="hover:text-orange-600 cursor-pointer">Cancellation Option</li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-lg mb-3">Hosting</h2>
          <ul className="space-y-2">
            <li className="hover:text-orange-600 cursor-pointer">Hosting Responsibility</li>
            <li className="hover:text-orange-600 cursor-pointer">Community Forum</li>
            <li className="hover:text-orange-600 cursor-pointer">Hosting Resources</li>
            <li className="hover:text-orange-600 cursor-pointer">Join a free Hosting Class</li>
            <li className="hover:text-orange-600 cursor-pointer">Find a co-host</li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-lg mb-3">About OneRoof</h2>
          <ul className="space-y-2">
            <li className="hover:text-orange-600 cursor-pointer">Career</li>
            <li className="hover:text-orange-600 cursor-pointer">Investors</li>
            <li className="hover:text-orange-600 cursor-pointer">Newsletter</li>
          </ul>
        </div>
      </div>

      {/* Social Icons */}
      <div className="flex justify-center gap-6 mt-10 text-2xl">
        <a
          href="https://www.instagram.com/lamejokes_08?igsh=MmNlcThhbDdpaXo2"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-orange-600 transition"
        >
          <i className="fa-brands fa-square-instagram"></i>
        </a>
        <a
          href="https://x.com/Abhijit_091"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-orange-600 transition"
        >
          <i className="fa-brands fa-square-x-twitter"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/abhijit-ghosh-63b624235/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-orange-600 transition"
        >
          <i className="fa-brands fa-linkedin"></i>
        </a>
        <a
          href="https://www.reddit.com/user/Open_Ad4468/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-orange-600 transition"
        >
          <i className="fa-brands fa-square-reddit"></i>
        </a>
      </div>

      {/* Bottom Note */}
      <h4 className="text-center mt-8 text-sm text-gray-500">
        &#169; {new Date().getFullYear()} Oneroof Private Limited
      </h4>
    </footer>
  );
};

export default Footer;
