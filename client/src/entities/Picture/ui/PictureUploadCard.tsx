import { ChangeEvent, FC, useCallback, useState } from 'react';
import { Delete, DriveFolderUpload, Save } from '@mui/icons-material';
import { useUploadPictureMutation } from '../model/paimages.api';
import { Button, Stack, TextField } from '@mui/material';

interface PictureloadCardProps {
    category: string;
    refresh: () => void;
}

export const PictureloadCard: FC<PictureloadCardProps> = (args) => {
    const [file, setFile] = useState<File | null>(null);
    const [fileLink, setFileLink] = useState<string | ArrayBuffer | null>(null);
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [material, setMaterial] = useState('');
    const [size, setSize] = useState('');

    const [uploadImage, uploadImageProps] = useUploadPictureMutation();

    const onFileChange = useCallback(
        async (event: ChangeEvent<HTMLInputElement>) => {
            let selectedFiles = event.target.files;
            if (selectedFiles) {
                let fl: File | null = selectedFiles.item(0);
                if (fl) {
                    setFile(fl);
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        if (e.target) setFileLink(e.target.result);
                    };
                    reader.readAsDataURL(fl);
                }
            }
        },
        [args.category],
    );
    const saveData = useCallback(() => {
        if (file) {
            const formData = new FormData();
            formData.append(`file`, file);
            formData.append('name', name);
            formData.append('date', date);
            formData.append('size', size);
            formData.append('material', material);
            uploadImage({
                category: args.category,
                data: formData,
            }).then(() => {
                setTimeout(() => {
                    if (args.refresh) {
                        args.refresh();
                    }
                    setFile(null);
                    setFileLink(null);
                    setName('');
                    setDate('');
                    setMaterial('');
                    setSize('');
                }, 1000);
            });
        }
    }, [name, date, material, file]);

    return (
        <Stack
            gap={1}
            spacing={1}
            alignItems={'center'}
            justifyContent={'center'}>
            <img
                src={
                    !fileLink
                        ? undefined
                        : typeof fileLink === 'string'
                        ? fileLink
                        : Buffer.from(fileLink).toString()
                }
                style={{
                    width: '300px',
                    margin: '5px',
                }}
                height={'100%'}
            />
            <TextField
                placeholder="Название"
                multiline
                minRows={2}
                fullWidth
                value={name}
                onChange={(event) => setName(event.target.value)}
            />
            <Stack direction={'row'}>
                <TextField
                    placeholder="Дата изготовления"
                    multiline
                    fullWidth
                    defaultValue={date}
                    onChange={(event) => setDate(event.target.value)}
                />
                <TextField
                    placeholder="Размер"
                    multiline
                    fullWidth
                    defaultValue={size}
                    onChange={(event) => setSize(event.target.value)}
                />
            </Stack>
            <TextField
                placeholder="Материал"
                multiline
                fullWidth
                value={material}
                onChange={(event) => setMaterial(event.target.value)}
            />
            <Stack flexDirection={'row'} alignItems={'center'}>
                <label
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid',
                        padding: '5px 10px',
                    }}>
                    <input
                        type="file"
                        accept=".jpg, .png, .jpeg, .gif"
                        onChange={onFileChange}
                        style={{ display: 'none' }}
                    />
                    <DriveFolderUpload />
                    Download
                </label>
                <Button variant="text" onClick={saveData}>
                    <Save />
                </Button>
            </Stack>
        </Stack>
    );
};
