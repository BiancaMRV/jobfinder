import styles from "./Navbar.module.css";

// export default function Navbar() {
//   return (
//     <div className={styles.headercontainer}>
//       <div className={styles.Navbar}>
//         <div className={styles.leftnavbar}>
//           <h1> Finder your dream job here! </h1>
//           <div className={styles.logo}>AMU</div>
//           <div className={styles.searchbar}>
//             <input
//               type="Job Search"
//               id="Job Search"
//               name="Job Search"
//               placeholder="Job Search"
//             />
//             <input
//               type="add zip code"
//               id="add zip code"
//               name="add zip code"
//               placeholder="add zip code"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <input
        type="Find jobs"
        id="Find jobs"
        name="Find jobs"
        placeholder="Find Jobs"
      />
      <input
        type="Find Talent"
        id="Find Talent"
        name="Find Talent"
        placeholder="Find Talent"
      />
      <input
        type="Upload Job"
        id="Upload Job"
        name="Upload Job"
        placeholder="Upload Job"
      />
      <input
        type="About Us"
        id="About Us"
        name="About Us"
        placeholder="About Us"
      />
    </div>
  );
}
