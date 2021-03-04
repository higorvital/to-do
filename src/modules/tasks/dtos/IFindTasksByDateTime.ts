interface IFindTasksByDateTime{
    user_id: string;
    day: number;
    month: number;
    year: number;
    hour: number;
    minute: number;
}

export default IFindTasksByDateTime;