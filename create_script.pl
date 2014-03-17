#!/usr/bin/env perl
use strict;
use warnings;

my ($start, $end);
my $indent = 0;
my $number = 0;
my $max_number = 0;
my $square = 0;
my @vars;

sub start {
    my ($code) = @_;
    $code =~ s/^(\s*)/'    ' x ($indent + length $1)/egm;
    $start .= $code;
}

sub end {
    my ($code) = @_;
    $code =~ s/^(\s*)/'    ' x ($indent + length $1)/egm;
    $end = $code . $end;
}

sub square {
    my ($n, $func) = @_;
    @vars = ();
    $start = '';
    $end = '';
    $indent = 1;
    $number = $n;
    $max_number = $n * ($n * $n + 1) / 2;
    $square = $n * $n;

    start <<END;
 var used = 0;
END
    $func->();
    my $vars = join ',', map { map { "x$_|0" } ($_*10+1..$_*10+$n) } (1..$n);
    end <<END;
 show_ans$n($vars);
END

    my $v = join ', ', map { "$_ = 0" } sort @vars;
    $v = "        var $v;\n";

    return $v . $start . $end;
}

sub search {
    my ($var, $cond, $start, $end) = @_;
    if($cond) {
        $cond =~ s/(x\d\d)/($1|0)/g;
        $cond = "  if(!($cond)) continue;\n";
    } else {
        $cond = '';
    }
    push @vars, "x$var";
    start <<"END";
 for(x$var = $start; (x$var|0) <= ($end|0); x$var = x$var + 1 | 0) {
$cond  if((used & (1 << x$var))) continue;
  used = used | (1 << x$var);
END
    end <<"END";
  used = used & ~(1 << x$var);
 }
END
    $indent++;
}

sub max {
    my ($first, @rest) = @_;
    if(@rest) {
        return sprintf 'max(%s,%s)|0', $first, max(@rest);
    } else {
        return $first;
    }
}

sub min {
    my ($first, @rest) = @_;
    if(@rest) {
        return sprintf 'min(%s,%s)|0', $first, min(@rest);
    } else {
        return $first;
    }
}

sub second {
    my ($var, $cond, @rest) = @_;
    my @sum = map { join '+', map { "x$_" } @$_ } @rest;
    my $min_x = max '1|0', map { "($max_number-($_)-($square|0))|0" } @sum;
    my $max_x = min "$square|0", map { "($max_number-($_)-(1|0))|0" } @sum;
    if($cond) {
        $cond =~ s/(x\d\d)/($1|0)/g;
        $cond = "  if(!($cond)) continue;\n";
    } else {
        $cond = '';
    }
    push @vars, "x$var", "min_x$var", "max_x$var";
    start <<"END";
 min_x$var = $min_x|0;
 max_x$var = $max_x|0;
 for(x$var = min_x$var; (x$var|0) <= (max_x$var|0); x$var = x$var + 1 | 0) {
$cond  if(used & (1 << x$var)) continue;
  used = used | (1 << x$var);
END
    end <<"END";
  used = used & ~(1 << x$var);
 }
END
    $indent++;
}

sub decide {
    my ($var, $c, @rest) = @_;
    if($c) {
        $c =~ s/(x\d\d)/($1|0)/g;
        $c = "  if(!($c)) break X$var;\n";
    } else {
        $c = '';
    }
    my @sum = map { join '+', map { "x$_" } @$_ } @rest;
    my $cond = join '', map {"  if(((x$var+$sum[$_])|0) != $max_number) break X$var\n"} (1..@sum-1);
    push @vars, "x$var";
    start <<"END";
 X$var: {
  x$var = $max_number - ($sum[0]) | 0;
$c$cond  if((x$var|0) < (1|0)) break X$var;
  if(used & (1 << x$var)) break X$var;
  used = used | (1 << x$var);
END
    end <<"END";
  used = used & ~(1 << x$var);
 }
END
    $indent++;
}

my $count3 = square 3, sub {
    search 11, undef, 1, 9;
    second 22, undef, [11];
    decide 33, 'x11 < x33', [11, 22];
    second 13, 'x11 < x13', [11], [33];
    decide 31, 'x13 < x31', [13, 22];
    decide 12, undef, [11, 13];
    decide 23, undef, [13, 33];
    decide 21, undef, [22, 23], [11, 31];
    decide 32, undef, [12, 22], [31, 33];
};

my $count4 = square 4, sub {
    search 22, undef, 1, 16;
    search 33, 'x22 < x33', 1, 16;
    search 23, 'x22 < x23', 1, 16;
    search 32, 'x23 < x32', 1, 16;
    second 11, undef, [22, 33];
    decide 44, undef, [11, 22, 33];
    second 14, undef, [23, 32];
    decide 41, undef, [14, 23, 32];
    second 12, undef, [11, 14], [22, 32];
    decide 13, undef, [11, 12, 14];
    decide 42, undef, [12, 22, 32];
    decide 43, undef, [13, 23, 33], [41, 42, 44];
    second 21, undef, [11, 41], [22, 23];
    decide 24, undef, [21, 22, 23];
    decide 31, undef, [11, 21, 41];
    decide 34, undef, [14, 24, 44], [31, 32, 33];
};

my $count5 = square 5, sub {
    search 22, undef, 1, 25;
    search 44, 'x22 < x44', 1, 25;
    search 24, 'x22 < x44', 1, 25;
    search 42, 'x24 < x42', 1, 25;
    search 11, undef, 1, 25;
    second 33, undef, [11, 22, 44];
    decide 55, undef, [11, 22, 33, 44];
    second 15, undef, [24, 33, 42];
    decide 51, undef, [15, 24, 33, 42];
    search 12, undef, 1, 25;
    second 13, undef, [11, 12, 15];
    decide 14, undef, [11, 12, 13, 15];
    search 21, undef, 1, 25;
    second 23, undef, [21, 22, 24];
    decide 25, undef, [21, 22, 23, 24];
    second 31, undef, [11, 21, 51];
    decide 41, undef, [11, 21, 31, 51];
    second 32, undef, [12, 22, 42];
    decide 52, undef, [12, 22, 32, 42];
    second 34, undef, [14, 24, 44], [31, 32, 33];
    decide 35, undef, [31, 32, 33, 34];
    decide 45, undef, [15, 25, 35, 55];
    decide 43, undef, [41, 42, 44, 45];
    decide 53, undef, [13, 23, 33, 43];
    decide 54, undef, [14, 24, 34, 44], [51, 52, 53, 55];
};

open my $in, '<', 'count.tmpl.js' or die $!;
open my $out, '>', 'count.js' or die $!;
while(my $line = <$in>) {
    $line =~ s(^\s*/\**\s*<COUNT3>\s*\**/)($count3);
    $line =~ s(^\s*/\**\s*<COUNT4>\s*\**/)($count4);
    $line =~ s(^\s*/\**\s*<COUNT5>\s*\**/)($count5);
    print $out $line;
}
close $in;
close $out;
