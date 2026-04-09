import zipfile
import xml.etree.ElementTree as ET
import sys
import glob
import os

def extract_text_from_docx(docx_path):
    try:
        z = zipfile.ZipFile(docx_path)
        doc = z.read('word/document.xml')
        root = ET.fromstring(doc)
        ns={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
        text = '\n'.join([node.text for node in root.findall('.//w:t', namespaces=ns) if node.text])
        return text
    except Exception as e:
        return str(e)

if __name__ == '__main__':
    for p in glob.glob('Documentación/*.docx'):
        base_name = os.path.basename(p)
        txt_name = os.path.splitext(base_name)[0] + '.md'
        dest_path = os.path.join('Documentación', txt_name)
        text = extract_text_from_docx(p)
        with open(dest_path, 'w', encoding='utf-8') as f:
            f.write(text)
        print(f"Saved {dest_path}")
