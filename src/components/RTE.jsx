/* eslint-disable react/prop-types */
import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

const RTE = ({name,control,label,defaultValue=""}) => {
  console.log(defaultValue)
  return (
    <div 
    className='w-full'>

{label && <label className='text-gray-700'>{label}</label>}
        <Controller
        name={name || " Content"}
        control={control}
        render={({field:{onChange}}) => (
            <Editor
            initialValue={defaultValue}
            init={{
                initialValue:defaultValue,
                height:500,
                menubar:false,
                plugins:[
                    'a11ychecker','advlist','advcode','advtable','autolink','checklist','export',
           'lists','link','image','charmap','preview','anchor','searchreplace','visualblocks',
           'powerpaste','fullscreen','formatpainter','insertdatetime','media','table','help','wordcount'
                ],
                toolbar: 'undo redo | casechange blocks | bold italic backcolor | ' +
                   'alignleft aligncenter alignright alignjustify | ' +
                   'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'

            }}
            onEditorChange={onChange}
            />
        )}
        />
    </div>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export default RTE