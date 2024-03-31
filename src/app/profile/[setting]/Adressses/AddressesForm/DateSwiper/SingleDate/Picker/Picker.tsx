import moment from "moment"
import { SingleBlock } from "./SingleBlock/SingleBlock"


export const Picker = () => {
    return (
        <div className='flex flex-col items-center justify-center p-2'>
            {Array.from({length: 5}, (_, i) => (
                <SingleBlock key={i} startTime={moment().set({hour: 8+i, minutes: 0, seconds: 0, millisecond: 0})} duration={60} />
            ))}
        </div>
    )
}
