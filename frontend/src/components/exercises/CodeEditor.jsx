import Editor from '@monaco-editor/react'

function CodeEditor({ value, onChange, language = 'java' }) {
    return (
        <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
            <Editor
                height="400px"
                language={language}
                theme="vs-dark"
                value={value}
                onChange={onChange}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                }}
            />
        </div>
    )
}

export default CodeEditor