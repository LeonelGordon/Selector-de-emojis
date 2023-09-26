import { forwardRef, useRef, useState, useEffect} from "react";
import {data as emojilist} from "./data.js";
import EmojiSearch from "./emojiSerch";
import EmojiButton from "./emojiButton";
import styles from "./emojiPicker.module.scss"; 


export function EmojiPicker (props, inputRef) {
    const [isOpen, setIsOpen] = useState(false);
    const [emojis,setEmojis] = useState(emojilist); 
    const containerRef= useRef(null);

useEffect(() => {
    window.addEventListener('click', e=> {
        if(!containerRef.current.contains(e.target)){
            setIsOpen(false);
            setEmojis(emojilist);
        }
    });
},[]);

function handleClickOpen (){
    setIsOpen(!isOpen);
}

function handleSearch (e){
    const q= e.target.value.toLowerCase();

    if(!!q)
    {
        const search= emojilist.filter((emoji) => {
            return  (
                    emoji.name.toLowerCase().includes(q) || 
                    emoji.keywords.toLowerCase().includes(q)
            );
        });

        setEmojis(search);
    }   
        else {
        setEmojis(emojilist);
    } 
}

function EmojiPickerContainer (){
     return (
        <div>
                <EmojiSearch onSearch={handleSearch}/>
                <div>
                    {emojis.map((emoji) => (
                        <div key={emoji.symbol}>{emoji.symbol} </div>
                        ))}
                </div>
        </div>
    );
    }

function handleOnClickemoji(emoji) {
        const cursorPos= inputRef.current.selectionStart;
        const text= inputRef.current.value;
        const prev= text.slice(0,cursorPos)
        const next= text.slice(cursorPos);

        inputRef.current.value= prev+emoji.symbol+ next;
        inputRef.current.selectionStart= cursorPos+emoji.symbol.length;
        inputRef.current.selectionEnd=cursorPos+emoji.symbol.length;
        inputRef.current.focus();
}
        return (
        <div ref={containerRef} className={styles.inputContainer}>
                <button onClick={handleClickOpen} className={styles.emojiPickerButton}>😊</button>
                {isOpen ? ( 
                <div className={styles.EmojiPickerContainer}>
                <EmojiSearch onSearch={handleSearch}/>
                    <div className={styles.emojiList}>
                        {emojis.map((emoji) => (
                            <EmojiButton
                            key={emoji.symbol} 
                            emoji={emoji} 
                            onClick={handleOnClickemoji}
                            />
                    ))}
                    </div>
                </div> ) : ( "" )}
        </div>
    );
}

export default forwardRef(EmojiPicker);
