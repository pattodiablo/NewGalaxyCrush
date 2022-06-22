<?xml version="1.0" encoding="UTF-8"?>
<tileset version="1.5" tiledversion="1.7.2" name="ciudad_tiles" tilewidth="32" tileheight="32" tilecount="72" columns="6">
 <grid orientation="orthogonal" width="64" height="64"/>
 <image source="../../../environment/ciudad_tiles.png" width="192" height="384"/>
 <tile id="7">
  <animation>
   <frame tileid="15" duration="100"/>
   <frame tileid="16" duration="100"/>
   <frame tileid="17" duration="100"/>
   <frame tileid="16" duration="100"/>
  </animation>
 </tile>
 <tile id="20">
  <properties>
   <property name="name" value="coin"/>
  </properties>
 </tile>
 <tile id="21">
  <properties>
   <property name="name" value="speed"/>
  </properties>
 </tile>
 <tile id="22">
  <properties>
   <property name="name" value="invisible"/>
  </properties>
 </tile>
 <wangsets>
  <wangset name="Set Nivel 01" type="corner" tile="19">
   <wangcolor name="Amarillos" color="#ff0000" tile="31" probability="1"/>
   <wangcolor name="Azules" color="#00ff00" tile="49" probability="1"/>
   <wangcolor name="Metalico" color="#0000ff" tile="7" probability="1"/>
   <wangtile tileid="0" wangid="0,0,0,3,0,0,0,0"/>
   <wangtile tileid="1" wangid="0,0,0,3,0,3,0,0"/>
   <wangtile tileid="2" wangid="0,0,0,0,0,3,0,0"/>
   <wangtile tileid="4" wangid="0,3,0,0,0,3,0,3"/>
   <wangtile tileid="5" wangid="0,3,0,3,0,0,0,3"/>
   <wangtile tileid="6" wangid="0,3,0,3,0,0,0,0"/>
   <wangtile tileid="7" wangid="0,3,0,3,0,3,0,3"/>
   <wangtile tileid="8" wangid="0,0,0,0,0,3,0,3"/>
   <wangtile tileid="10" wangid="0,0,0,3,0,3,0,3"/>
   <wangtile tileid="11" wangid="0,3,0,3,0,3,0,0"/>
   <wangtile tileid="12" wangid="0,3,0,0,0,0,0,0"/>
   <wangtile tileid="13" wangid="0,3,0,0,0,0,0,3"/>
   <wangtile tileid="14" wangid="0,0,0,0,0,0,0,3"/>
   <wangtile tileid="24" wangid="0,0,0,1,0,0,0,0"/>
   <wangtile tileid="25" wangid="0,0,0,1,0,1,0,0"/>
   <wangtile tileid="26" wangid="0,0,0,0,0,1,0,0"/>
   <wangtile tileid="28" wangid="0,1,0,0,0,1,0,1"/>
   <wangtile tileid="29" wangid="0,1,0,1,0,0,0,1"/>
   <wangtile tileid="30" wangid="0,1,0,1,0,0,0,0"/>
   <wangtile tileid="31" wangid="0,1,0,1,0,1,0,1"/>
   <wangtile tileid="32" wangid="0,0,0,0,0,1,0,1"/>
   <wangtile tileid="34" wangid="0,0,0,1,0,1,0,1"/>
   <wangtile tileid="35" wangid="0,1,0,1,0,1,0,0"/>
   <wangtile tileid="36" wangid="0,1,0,0,0,0,0,0"/>
   <wangtile tileid="37" wangid="0,1,0,0,0,0,0,1"/>
   <wangtile tileid="38" wangid="0,0,0,0,0,0,0,1"/>
   <wangtile tileid="42" wangid="0,0,0,2,0,0,0,0"/>
   <wangtile tileid="43" wangid="0,0,0,2,0,2,0,0"/>
   <wangtile tileid="44" wangid="0,0,0,0,0,2,0,0"/>
   <wangtile tileid="46" wangid="0,2,0,0,0,2,0,2"/>
   <wangtile tileid="47" wangid="0,2,0,2,0,0,0,2"/>
   <wangtile tileid="48" wangid="0,2,0,2,0,0,0,0"/>
   <wangtile tileid="49" wangid="0,2,0,2,0,2,0,2"/>
   <wangtile tileid="50" wangid="0,0,0,0,0,2,0,2"/>
   <wangtile tileid="52" wangid="0,0,0,2,0,2,0,2"/>
   <wangtile tileid="53" wangid="0,2,0,2,0,2,0,0"/>
   <wangtile tileid="54" wangid="0,2,0,0,0,0,0,0"/>
   <wangtile tileid="55" wangid="0,2,0,0,0,0,0,2"/>
   <wangtile tileid="56" wangid="0,0,0,0,0,0,0,2"/>
  </wangset>
 </wangsets>
</tileset>
