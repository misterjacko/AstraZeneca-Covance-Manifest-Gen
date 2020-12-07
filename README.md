# AstraZeneca-Covance-Manifest-Gen

**\*Use at your own risk. This tool is to facilitate the generation of a simples
hipping manifest but it remains your responsibility to care for your samples
and their cold-chain (if applicable). You are ultimately responsible for the
paperwork and samples that pass through your lab.**

___

## Why?

During clinical trials, samples are often collected at locations throughout
the world and sent to central reference laboratories for testing. In the case
of the AstraZeneca COVID-19 vaccine trial, a variety of different samples are
collected from each trial participant during multiple visits. These multiple
samples often arrive in the lab where they are processed and separated to
accommodate the temporary storage temperatures, spec. tube sizes, and shipping
schedules. When the samples are shipped to Covance Central Laboratory, they
need to be re-paired with their requisitions (or copies of the requisitions)
so that the central lab knows what they are and what to do with them. 

Due to patient confidentiality requirements and the good clinical trial
practice of blinding patient samples, the samples are only labeled with a
barcode connecting it to the requisition. This greatly complicates the pairing
up of requisition and sample as people are generally bad at reading barcodes
or otherwise matching up 10-12 digit numbers. 

Thankfully, we have computers that are pretty good at that. 

---
## Initial Functionality

In its current form, this project consists of just an html page for data input
and display and a javascript file for data manipulation. It can be run locally
by placing the files in the same folder and opening index.html (you don't even
need to be connected to the internet), or by using a web version [HERE](http://astrazeneca-covid19-shipping-manifest.s3-website-us-east-1.amazonaws.com/)

Barcodes are scanned, filtered to just be numbers (some barcode readers will
add letters to the input), and added to dictionaries where they can be paired
with their respective aliquots or requisitions (depending on which order they
are scanned in)

Barcodes can be scanned to remove them from the manifest. This is especially
useful if you have scanned in a requisition that should not be a part of the
shipment. 

Nothing is submitted or stored. This means that if the page is refreshed the
data will be lost. 
