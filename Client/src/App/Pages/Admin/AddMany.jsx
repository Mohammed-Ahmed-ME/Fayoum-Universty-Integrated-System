import { Header, } from '../../Components';
import { useStateContext } from "../../../contexts/ContextProvider";


const AddMany = () => {

    const { currentColor,UserData } = useStateContext();
    if(UserData.role !== "Full Administrator")
    {
        window.location.href = "/Login"
        return null
    }
    else
    return (
        <div className="m-2 md:m-10 mt-10 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="ADD" title="Add Many" />
            <h1 className="flex flex-wrap lg:flex-nowrap justify-center text-lg  pt-6 pb-2 items-center text-center sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl" style={{ color: currentColor }}>
                Coming Soon...
            </h1>
        </div>
    );
};

export default AddMany;
