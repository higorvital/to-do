// interface TimeTask{
//     hour: number;
//     minute: number;
// }

// interface DateTask{
//     day: number;
//     month: number;
//     year: number;
// }

interface ICreateTask {
    title: string;
    description?: string;
    date: Date;
    time?: Date;
    important?: boolean;
    user_id: string;
    subcategory_id?: string;
}

export default ICreateTask;