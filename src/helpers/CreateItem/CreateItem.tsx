interface CreateItemProps {
    token: string;
    onCreateComplete: () => void;
    onItemCreated: (token: string) => void;
}


function CreateItem({ token, onCreateComplete, onItemCreated }: CreateItemProps) {
    console.log('token: ',  token)
    console.log('onCreateComplete: ',  onCreateComplete)
    console.log('onItemCreated: ',  onItemCreated)

    return (
        <div>CreateItem</div>
    );
}

export default CreateItem;