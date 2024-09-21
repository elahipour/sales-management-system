import OpenSidebarIcon from "../icons/OpenSidebarIcon"
function OpenSidebarBtn() {
  return (
    <label htmlFor="my-drawer" className="btn bg-[#CdDF9F] hover:bg-[#aabb80] fixed top-24 rounded-bl-none rounded-tl-none drawer-button flex items-center p-2">
    <OpenSidebarIcon/>
  </label>
  )
}

export default OpenSidebarBtn