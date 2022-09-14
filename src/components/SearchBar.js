function SearchBar() {
  return (
    <div className="search-bar">
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="w-64 rounded-full bg-[#e9e9e9] p-2 text-sm"
        />
        <img
          src="https://res.cloudinary.com/du3oueesv/image/upload/v1663124810/shopping%20cart/1890px-Vector_search_icon.svg_odyv9y.png"
          alt="search"
          className="absolute right-2.5 top-[10px] h-4 w-4"
        />
      </div>
    </div>
  );
}

export default SearchBar;
