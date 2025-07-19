export const columns=[
    {
        name :'Sr No',
        selector:(row)=> row.srno
    },

    {
        name :'Department Name',
        selector:(row)=> row.dep_name
    },

    {
        name :'Action',
        selector:(row)=> row.action
    },
]

export const DepartmentButtons = () => {
  return (
    <div className="flex gap-2 space-x-3">
      <button className="px-3 py-1 bg-teal-600 text-white rounded hover:bg-blue-700 transition">
        Edit
      </button>
      <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition">
        Delete
      </button>
    </div>
  );
};
