import React from 'react'

const CharAvatar = ({ fullname, width, height, style}) => {

    const getInitials = (fullname) => {
        if (!fullname) return "";
      
        const nameParts = fullname.split(" ");
        const initials = nameParts.map(name => name.charAt(0).toUpperCase()).join("");
      
        return initials;
      };
  return (
    <div className={`${width || "w-12"} ${height || "h-12"} ${style || ""} flex items-center justify-center rounded-full text-gray-900 font-medium bg-gray-100`}>
      {getInitials(fullname)}
    </div>
  )
}

export default CharAvatar
