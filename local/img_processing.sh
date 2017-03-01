# vertically concatenate generated sprite sheets
convert stand.png walking.png attack.png death.png hit.png -append charactersheet.png

# convert all b,p sprite files to png
gm mogrify -transparent "#6a4c30" -format png *.bmp