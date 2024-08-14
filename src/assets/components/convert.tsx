const convertToReadableUnit = (bytes: number) => {
    if (bytes >= 1e6) {
        return (bytes / 1e6).toFixed(2) + ' MB';
    } else if (bytes >= 1e3) {
        return (bytes / 1e3).toFixed(2) + ' KB';
    } else {
<<<<<<< HEAD
        return bytes.toFixed(2) + ' bytes';
    }
}
=======
        return bytes + ' bytes';
    }
}

>>>>>>> myrepo/main
export default convertToReadableUnit;