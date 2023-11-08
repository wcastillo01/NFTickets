import React from 'react'

export default function Reviews() {
    return (
        <div>
            <h1 className="text-4xl font-bold mb-16 mt-8 text-center text-white">
                Tu opinion es importante. Dejanos saber que piensas!
            </h1>
            <div style={{ display: 'flex', justifyContent: 'center', }}>
                <iframe
                    width="800px"
                    height="600px"
                    src="https://forms.office.com/Pages/ResponsePage.aspx?id=CK8XQOGiqk2RgFs7yO6E-oh_SuOz6VBBmwaolsiMWmRUNDI5NkFRWVZVUVdDSFVJOUhKSUg4TFc4QS4u&embed=true"
                    style={{ border: 'none', maxWidth: '100%' }}
                ></iframe>
            </div>

        </div>
    )
}