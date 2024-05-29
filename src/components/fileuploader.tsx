import Image from 'next/image';
import Photo from '../../public/images/icon/file-upload.svg';




export function HotelImageUploader() {
    // const [fileUrls, setFileUrls] = useState<string[]>([]);
    // const [uploading, setUploading] = useState(false);

    // const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    //     fieldChange(acceptedFiles);
    //     setFileUrls(acceptedFiles.map(file => URL.createObjectURL(file)));
    // }, [fieldChange]);

    // useEffect(() => {
    //     // Update fileUrls when photo1 or otherPhotos1 changes
    //     const updatedUrls = [...(otherPhotos1 || []), ...(photo1 ? [URL.createObjectURL(photo1)] : [])];
    //     setFileUrls(updatedUrls.map(url => typeof url === 'string' ? url : URL.createObjectURL(url)));
    // }, [photo1, otherPhotos1]);

    // const { getRootProps, getInputProps } = useDropzone({
    //     onDrop,
    //     maxFiles: 5,
    //     accept: {
    //         "image/*": ['.jpg', '.png', '.jpeg', '.svg']
    //     }
    // });

    return (
        <div>
            <div className={'flex flex-center cursor-pointer rounded-xl gap-2 bg-dark-3'}>

                <div className='flex flex-col gap-3'>
                    <Image
                        src={Photo}
                        alt='upload file'
                        quality={100}
                        width={500}
                        height={500}
                        className='w-12 h-12'
                    />
                </div>

            </div>

        </div>
    );
}
