
const lottiesOption=(data,loop)=>{
  const defaultOptions = {
    loop: loop,
    autoplay: true,
    animationData: data,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return defaultOptions;
}
  
  export default lottiesOption