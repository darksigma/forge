import zipfile
import os
import datetime
import boto
from boto.s3.key import Key

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
zf = zipfile.ZipFile('Lambda.zip', mode='w')

try:
    files = [f for f in os.listdir('.') if not f.endswith(".zip")]
    for f in files:
        print('ADDING: ' + f)
        zf.write(f)
finally:
    print 'CLOSING ARCHIVE'
    zf.close()

print
print_info('lambda_zip.zip')

c = boto.connect_s3()
b = c.create_bucket('forge-06199412')
k = Key(b)
k.key = 'lambda_zip'
k.set_contents_from_filename('lambda_zip.zip')

