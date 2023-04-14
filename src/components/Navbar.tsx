import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <>
      <nav className="content">
        <Link href="/">
          <div className="logo">
            <img src="/logo.png" alt="site logo" width={163} height={68} />
          </div>
        </Link>
        <Link href="/">Home</Link>
        <Link href="/login">Login</Link>
      </nav>
    </>
  );
};

export default Navbar;
