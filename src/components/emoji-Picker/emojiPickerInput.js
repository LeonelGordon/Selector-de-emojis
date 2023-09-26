import { useRef } from "react";
import EmojiPicker from "./emojiPicker";

export default function EmojiPickerInput(){

    const refInput= useRef(null);

    return (
        <div>
                <input ref={refInput}/>
                <EmojiPicker ref={refInput}/> 
        </div>
    );
}