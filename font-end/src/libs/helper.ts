export const TruncateTxt = (text: string, lenghtTruncate: number) => {
    if (text.length < lenghtTruncate) {
        return text;
    }
    const listWord = text.split(' ');
    const txtTruncate = listWord.reduce((previous, current) => {
        if (previous.length < (lenghtTruncate - 3)) {
            return `${previous} ${current}`;
        }
        return previous;
    }, "")

    return txtTruncate + '...';
}

export const ValidateNameProject = (nameProject: string) => {
    if (nameProject.length < 1 || nameProject.length > 100) {
        return 'Name includes 100 characters';
    }
    const regex = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯẶẮẴẰẶẲẶắẵằẳặềếễểệồốỗổộờớỡởợừứữửựýỳỷỹỵ0-9\s]+$/;
    if (!regex.test(nameProject)) {
        return 'Only text and space';
    }

    return null;
}

export const ValidateDescriptionProject = (descriptionProject: string) => {
    if (descriptionProject.length < 1 || descriptionProject.length > 200) {
        return 'Description includes 200';
    }

}
