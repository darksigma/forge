import zipfile
import datetime

def print_info(archive_name):
    zf = zipfile.ZipFile(archive_name)
    for info in zf.infolist():
        print info.filename
        print '\tComment:\t', info.comment
        print '\tModified:\t', datetime.datetime(*info.date_time)
        print '\tSystem:\t\t', info.create_system, '(0 = Windows, 3 = Unix)'
        print '\tZIP version:\t', info.create_version
        print '\tCompressed:\t', info.compress_size, 'bytes'
        print '\tUncompressed:\t', info.file_size, 'bytes'
        print

print
print 'CREATING ARCHIVE'
zf = zipfile.ZipFile('lambda_zip.zip', mode='w')
try:
    print 'ADDING LAMBDA.JS'
    zf.write('lambda.js')
    print 'ADDING CARD_FUNCTIONS.JS'
    zf.write('card_functions.js')
finally:
    print 'CLOSING ARCHIVE'
    zf.close()

print
print_info('lambda_zip.zip')