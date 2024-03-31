import moment from "moment";

type SingleBlockProps = {
    startTime: moment.Moment | string;
    duration: number; // in minutes
}

export const SingleBlock = (props:SingleBlockProps) => {
    const onClick = () => {
        console.log('clicked', moment(props.startTime).format('HH:mm'));
    }

    return (
        <div className='flex flex-col items-center justify-center p-2 bg-blue-50 rounded-lg mb-2 px-8 text-sm whitespace-nowrap cursor-pointer hover:bg-blue-100 transition' onClick={onClick}>
            {moment(props.startTime).format('HH:mm')} - {moment(props.startTime).add(props.duration, 'minutes').format('HH:mm')}
        </div>
    )
}
