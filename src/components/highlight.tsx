import React from 'react';
import styles from './highlight.module.css';

interface HighlightProps {
    searchText: string[];
}

const highlightAndSet = (text: string, searchText: string[], editableDivRef: React.RefObject<HTMLDivElement>) => {
    const createRegex = () => {
        const searchTextRegex = searchText.map(word => `\\b${word}\\b`).join('|');
        return new RegExp(`(${searchTextRegex})`, 'gi');
    };

    const parts = text.split(createRegex());
    const highlightedParts = parts.map((part, index) => {
        const isHighlighted = searchText.includes(part.toLowerCase());
        return isHighlighted ? `<b key=${index} class=${styles.highlight}>${part}</b>` : part;
    });

    if (editableDivRef.current) {
        editableDivRef.current.innerHTML = highlightedParts.join('');
    }
};

export const Highlight = (props: HighlightProps) => {
    const { searchText } = props;
    const editableDivRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (editableDivRef.current) {
            editableDivRef.current.focus();
        }
    }, []);

    const handleScanClick = () => {
        if (!editableDivRef.current) return;
        const editedText = editableDivRef.current.innerHTML;
        highlightAndSet(editedText, searchText, editableDivRef);
    };

    const handleScanClear = () => {
        if (editableDivRef.current) {
            editableDivRef.current.innerHTML = '';
        }
    };

    return (
        <div>
            <button onClick={handleScanClick} className={styles.button}>
                Scan
            </button>
            <button onClick={handleScanClear} className={styles.button}>
                Clear
            </button>
            <div
                contentEditable="true"
                className={styles.text}
                ref={editableDivRef}
                suppressContentEditableWarning={true}
            />
        </div>
    );
};
