type HeaderLibraryProps = {
  isCurrentPath: boolean,
  setPath: () => void,
  Icon: any,
  path: string
}

function HeaderLibraryButton({
  isCurrentPath,
  setPath,
  path,
  Icon
}: HeaderLibraryProps) {
  return (
    <div
    className={`relative ${isCurrentPath ? '' : 'hover:bg-base-500'} rounded-md duration-100 ease p-3 cursor-pointer`}
    onClick={setPath}
  >
    <Icon
      key={path}
      className={`w-7 h-7 ${isCurrentPath ? "" : "opacity-75"}`}
    />
    
    { isCurrentPath ? 
      <div className="absolute flex left-0 bottom-0 justify-center h-1 w-full">
        <div className="h-1 rounded-md w-[25%] bg-white"></div>
      </div> 
      : null
    }
  </div> 
  )
}

export default HeaderLibraryButton;