from zipfile_infolist import print_info
import zipfile

print 'creating archive'
zf = zipfile.ZipFile('lambda_zip.zip', mode='w')
try:
    print 'adding lambda.js'
    zf.write('lambda.js')
    print 'adding card_functions.js'
    zf.write('card_functions.js')
finally:
    print 'closing'
    zf.close()

print
print_info('lambda_zip.zip')