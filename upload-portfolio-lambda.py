import boto3
import StringIO
import zipfile
import mimetypes


def lambda_handler(event, context):
    sns = boto3.resource("sns")
    topic = sns.Topic('arn:aws:sns:us-east-1:511586206318:deployPortfolioTopic')

    try:
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

        print "job Done"
        topic.publish(Subject="Portfolio Deploy", Message="POrtfolio Deployed Successfully")
    except:
        topic.publish(Subject="Portfolio deploy failed", Message="The POrtfolio was not deployed successfully")
        raise
