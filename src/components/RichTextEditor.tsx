'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import { 
  FaBold, 
  FaItalic, 
  FaUnderline, 
  FaStrikethrough,
  FaListUl,
  FaListOl,
  FaQuoteLeft,
  FaCode,
  FaLink,
  FaUndo,
  FaRedo,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight
} from 'react-icons/fa';

interface EditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ content, onChange, placeholder }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-secondary underline',
        },
      }),
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      TextStyle,
      Color,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none',
      },
    },
  });

  if (!editor) {
    return null;
  }

  const addLink = () => {
    const url = window.prompt('Enter URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b border-white/10 bg-white/5">
        {/* Text Formatting */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-white/10 ${
            editor.isActive('bold') ? 'bg-primary/20 text-primary' : ''
          }`}
          title="Bold"
        >
          <FaBold />
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-white/10 ${
            editor.isActive('italic') ? 'bg-primary/20 text-primary' : ''
          }`}
          title="Italic"
        >
          <FaItalic />
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded hover:bg-white/10 ${
            editor.isActive('underline') ? 'bg-primary/20 text-primary' : ''
          }`}
          title="Underline"
        >
          <FaUnderline />
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded hover:bg-white/10 ${
            editor.isActive('strike') ? 'bg-primary/20 text-primary' : ''
          }`}
          title="Strikethrough"
        >
          <FaStrikethrough />
        </button>

        <div className="w-px h-6 bg-white/10 mx-1" />

        {/* Headings */}
        <select
          onChange={(e) => {
            const level = parseInt(e.target.value);
            if (level === 0) {
              editor.chain().focus().setParagraph().run();
            } else {
              editor.chain().focus().toggleHeading({ level: level as any }).run();
            }
          }}
          className="px-2 py-1 rounded bg-white/5 border border-white/10 text-sm hover:bg-white/10"
          value={
            editor.isActive('heading', { level: 1 }) ? 1 :
            editor.isActive('heading', { level: 2 }) ? 2 :
            editor.isActive('heading', { level: 3 }) ? 3 : 0
          }
        >
          <option value="0">Paragraph</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
        </select>

        <div className="w-px h-6 bg-white/10 mx-1" />

        {/* Lists */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-white/10 ${
            editor.isActive('bulletList') ? 'bg-primary/20 text-primary' : ''
          }`}
          title="Bullet List"
        >
          <FaListUl />
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-white/10 ${
            editor.isActive('orderedList') ? 'bg-primary/20 text-primary' : ''
          }`}
          title="Numbered List"
        >
          <FaListOl />
        </button>

        <div className="w-px h-6 bg-white/10 mx-1" />

        {/* Alignment */}
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`p-2 rounded hover:bg-white/10 ${
            editor.isActive({ textAlign: 'left' }) ? 'bg-primary/20 text-primary' : ''
          }`}
          title="Align Left"
        >
          <FaAlignLeft />
        </button>
        
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`p-2 rounded hover:bg-white/10 ${
            editor.isActive({ textAlign: 'center' }) ? 'bg-primary/20 text-primary' : ''
          }`}
          title="Align Center"
        >
          <FaAlignCenter />
        </button>
        
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`p-2 rounded hover:bg-white/10 ${
            editor.isActive({ textAlign: 'right' }) ? 'bg-primary/20 text-primary' : ''
          }`}
          title="Align Right"
        >
          <FaAlignRight />
        </button>

        <div className="w-px h-6 bg-white/10 mx-1" />

        {/* Other */}
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-white/10 ${
            editor.isActive('blockquote') ? 'bg-primary/20 text-primary' : ''
          }`}
          title="Blockquote"
        >
          <FaQuoteLeft />
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded hover:bg-white/10 ${
            editor.isActive('codeBlock') ? 'bg-primary/20 text-primary' : ''
          }`}
          title="Code Block"
        >
          <FaCode />
        </button>
        
        <button
          onClick={addLink}
          className={`p-2 rounded hover:bg-white/10 ${
            editor.isActive('link') ? 'bg-primary/20 text-primary' : ''
          }`}
          title="Add Link"
        >
          <FaLink />
        </button>

        <div className="w-px h-6 bg-white/10 mx-1" />

        {/* Undo/Redo */}
        <button
          onClick={() => editor.chain().focus().undo().run()}
          className="p-2 rounded hover:bg-white/10"
          title="Undo"
          disabled={!editor.can().undo()}
        >
          <FaUndo />
        </button>
        
        <button
          onClick={() => editor.chain().focus().redo().run()}
          className="p-2 rounded hover:bg-white/10"
          title="Redo"
          disabled={!editor.can().redo()}
        >
          <FaRedo />
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} className="min-h-[300px] p-4" />
    </div>
  );
}
