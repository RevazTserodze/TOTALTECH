NoneResponsiveNav;
import NoneResponsiveNav from "./NoneeResponsiveNav";
import ResponsiveNav from "./ResponsiveNav";

const Nav = () => {
  return (
    <>
      <div style={{ marginTop: "140px" }} className="none-responsive">
        <NoneResponsiveNav />
      </div>
      <div style={{ marginTop: "140px" }} className="responsive">
        <ResponsiveNav />
      </div>
    </>
  );
};

export default Nav;
