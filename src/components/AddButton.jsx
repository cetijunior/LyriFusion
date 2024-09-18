// Button.js (New Component)
// eslint-disable-next-line react/prop-types
const AddButton = ({ label, onClick }) => (
    <button
      className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg w-full lg:w-1/3 mb-4 lg:mb-0"
      onClick={onClick}
    >
      {label}
    </button>
  );
  
  export default AddButton;
  