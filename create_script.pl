#!/usr/bin/env perl
use strict;
use warnings;

my ($start, $end);
my $indent = 0;
my $number = 0;
my $max_number = 0;

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
    $start = '';
    $end = '';
    $indent = 0;
    $number = $n;
    $max_number = $n * ($n * $n + 1) / 2;

    start <<END;
 var used = 0;
END
    $func->();
    my $vars = join ',', map { map { "x$_" } ($_*10+1..$_*10+$n) } (1..$n);
    end <<END;
 show_ans([$vars]);
END
    return $start . $end;
}

sub search {
    my ($var, $cond, $start, $end) = @_;
    if($cond) {
        $cond = "!($cond) || ";
    } else {
        $cond = "";
    }
    start <<"END";
 for(var x$var = $start; x$var <= $end; x$var++) {
  if($cond(used & (1 << x$var))) continue;
  used |= (1 << x$var);
END
    end <<"END";
  used &= ~(1 << x$var);
 }
END
    $indent++;
}

sub second {
    my ($var, $cond, @rest) = @_;
    my @sum = map { join '+', map { "x$_" } @$_ } @rest;
    my $min_x = join ',', 1, map { "$max_number-($_)-$number*$number" } @sum;
    my $max_x = join ',',  $number*$number, map { "$max_number-($_)-1" } @sum;
    if($cond) {
        $cond = "!($cond) || ";
    } else {
        $cond = "";
    }
    start <<"END";
 var min_x$var = Math.max($min_x);
 var max_x$var = Math.min($max_x);
 for(var x$var = min_x$var; x$var <= max_x$var; x$var++) {
  if($cond(used & (1 << x$var))) continue;
  used |= (1 << x$var);
END
    end <<"END";
  used &= ~(1 << x$var);
 }
END
    $indent++;
}

sub decide {
    my ($var, $c, @rest) = @_;
    my @sum = map { join '+', map { "x$_" } @$_ } @rest;
    my $cond = join '', map {"x$var+$sum[$_] != $max_number || "} (1..@sum-1);
    $cond .= "$c ||" if $c;
    start <<"END";
 X$var: {
  var x$var = $max_number - ($sum[0]);
  if(${cond}x$var < 1 || (used & (1 << x$var))) break X$var;
  used |= (1 << x$var);
END
    end <<"END";
  used &= ~(1 << x$var);
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
