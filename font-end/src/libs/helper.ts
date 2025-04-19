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