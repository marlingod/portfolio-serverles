import boto3
import StringIO
import zipfile
import mimetypes
s3 = boto3.resource('s3')

portfolio_bucket = s3.Bucket('portfolio.sky-vaults.com')
build_bucket = s3.Bucket('portfoliobuild.sky-vaults.com')


portfolio_zip = StringIO.StringIO()
build_bucket.download_fileobj('portfoliobuild.zip', portfolio_zip)

with zipfile.ZipFile(portfolio_zip) as myzip:
        for mm in myzip.namelist():
            obj = myzip.open(mm)
            portfolio_bucket.upload_fileobj(obj,mm, ExtraArgs={'ContentType': mimetypes.guess_type(mm)[0]})
            portfolio_bucket.Object(mm).Acl().put(ACL='public-read')
