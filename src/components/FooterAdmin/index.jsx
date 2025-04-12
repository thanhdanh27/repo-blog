import "./FooterAdmin.scss";

export default function FooterAdmin() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <div className="title-footerAdmin">
        Copyright © {currentYear} DesignRevision
      </div>
    </>
  );
}
