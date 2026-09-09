interface GenericTableProps<T> {
    targetSubjects: T[];
    someList: string[];
}

const GenericTable = <T,>({
    targetSubjects,
    someList,
}: GenericTableProps<T>) => {
    console.log(targetSubjects);
    console.log(someList);

    return (
        <>
            hello
        </>
    );
}

export default GenericTable;
