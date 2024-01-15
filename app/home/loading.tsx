import { ArrowPathIcon } from "@heroicons/react/24/solid"

const Loading = (textLoading: any) => {
    return (
        <div className="flex flex-col min-h-full w-full items-center justify-center bg-white border-2 border-orange-500 rounded-md shadow-lg">
            <ArrowPathIcon className=" animate-spin w-full h-6"/>
            <p>{textLoading.textLoading}</p>
        </div>
    )
}

export default Loading