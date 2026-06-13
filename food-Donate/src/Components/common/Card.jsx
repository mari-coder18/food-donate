export const Card = ({ title, value }) => {

    return (

        <div className=" bg-white border-orange hover:scale-105 p-5 rounded-2xl shadow hover:shadow-lg transition ">

            <h2 className="text-gray-500 text-xl font-bold">
                {title}
            </h2>

            <p className="text-3xl font-bold mt-3">
                {value}
            </p>

        </div>
    );
};